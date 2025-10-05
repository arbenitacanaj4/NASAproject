import { NextResponse } from "next/server"

const NASA_API_KEY = "xamjNL3UmDkFB1DATgrN333AhGNDcY5B6uxX8jNQ"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  try {
    const allAsteroids: any[] = []

    const initialResponse = await fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${NASA_API_KEY}`,
      { next: { revalidate: 3600 } },
    )

    if (!initialResponse.ok) {
      const errorText = await initialResponse.text()
      console.error("[v0] NASA API error:", errorText)
      throw new Error("Failed to fetch asteroid data from NASA")
    }

    const initialData = await initialResponse.json()
    const totalPages = initialData.page.total_pages

    const pagesToFetch = Math.min(30, totalPages)

    console.log(`[v0] Fetching ${pagesToFetch} pages of asteroids from NASA API`)

    const batchSize = 5
    for (let batchStart = 0; batchStart < pagesToFetch; batchStart += batchSize) {
      const batchEnd = Math.min(batchStart + batchSize, pagesToFetch)
      const batchPromises = []

      for (let page = batchStart; page < batchEnd; page++) {
        batchPromises.push(
          fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=${page}&size=20&api_key=${NASA_API_KEY}`, {
            next: { revalidate: 3600 },
          }).then(async (res) => {
            if (!res.ok) {
              const errorText = await res.text()
              console.error(`[v0] Error fetching page ${page}:`, errorText)
              return null
            }
            return res.json()
          }),
        )
      }

      const batchResults = await Promise.all(batchPromises)

      for (const data of batchResults) {
        if (!data || !data.near_earth_objects) continue

        const parsedAsteroids = data.near_earth_objects.map((neo: any) => {
          const diameter = neo.estimated_diameter?.meters?.estimated_diameter_max || 500
          const closeApproach = neo.close_approach_data?.[0]
          const velocity = closeApproach?.relative_velocity?.kilometers_per_second || 10
          const distance = closeApproach?.miss_distance?.astronomical || 0.01

          return {
            name: neo.name,
            diameter: Math.round(diameter),
            velocity: Number.parseFloat(velocity),
            distance: Number.parseFloat(distance),
            composition: neo.neo_reference_id.includes("2") ? "Stony (S-type)" : "Carbonaceous (C-type)",
            status: neo.is_potentially_hazardous_asteroid ? "Potentially Hazardous" : "Near-Earth Object",
          }
        })

        allAsteroids.push(...parsedAsteroids)
      }

      if (batchStart + batchSize < pagesToFetch) {
        await delay(500)
      }
    }

    console.log(`[v0] Successfully fetched ${allAsteroids.length} asteroids`)

    return NextResponse.json({ asteroids: allAsteroids })
  } catch (error) {
    console.error("Error fetching asteroids:", error)
    return NextResponse.json({ error: "Failed to fetch asteroid data" }, { status: 500 })
  }
}
