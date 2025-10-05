import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const { asteroid, parameters, results } = await request.json()

    // Create PDF document
    const doc = new jsPDF()

    // Set up styling
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let yPosition = 20

    // Title
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("MeteorGAR Impact Simulation Report", pageWidth / 2, yPosition, { align: "center" })

    yPosition += 15
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth / 2, yPosition, { align: "center" })

    // Asteroid Details Section
    yPosition += 20
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Asteroid Details", margin, yPosition)

    yPosition += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text(`Name: ${asteroid.name}`, margin, yPosition)
    yPosition += 7
    doc.text(`Diameter: ${asteroid.diameter} meters`, margin, yPosition)
    yPosition += 7
    doc.text(`Velocity: ${asteroid.velocity} km/s`, margin, yPosition)
    yPosition += 7
    doc.text(`Distance from Earth: ${asteroid.distance} AU`, margin, yPosition)
    yPosition += 7
    doc.text(`Composition: ${asteroid.composition}`, margin, yPosition)
    yPosition += 7
    doc.text(`Status: ${asteroid.status}`, margin, yPosition)

    // Impact Parameters Section
    yPosition += 15
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Impact Parameters", margin, yPosition)

    yPosition += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text(`Impact Angle: ${parameters.impactAngle}°`, margin, yPosition)
    yPosition += 7
    doc.text(`Latitude: ${parameters.latitude}°`, margin, yPosition)
    yPosition += 7
    doc.text(`Longitude: ${parameters.longitude}°`, margin, yPosition)

    // Simulation Results Section
    yPosition += 15
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Simulation Results", margin, yPosition)

    yPosition += 10
    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    doc.text(`Crater Diameter: ${results.craterDiameter.toLocaleString()} meters`, margin, yPosition)
    yPosition += 7
    doc.text(`Crater Depth: ${results.craterDepth.toLocaleString()} meters`, margin, yPosition)
    yPosition += 7
    doc.text(`Impact Energy: ${results.impactEnergy.toLocaleString()} megatons TNT`, margin, yPosition)
    yPosition += 7
    doc.text(`Blast Radius: ${results.blastRadius.toLocaleString()} km`, margin, yPosition)
    yPosition += 7
    doc.text(`Thermal Radiation Radius: ${results.thermalRadius.toLocaleString()} km`, margin, yPosition)
    yPosition += 7
    doc.text(`Seismic Magnitude: ${results.seismicMagnitude} Richter`, margin, yPosition)
    yPosition += 7
    doc.text(`Estimated Population Impact: ${results.affectedPopulation.toLocaleString()} people`, margin, yPosition)

    // Footer
    yPosition = doc.internal.pageSize.getHeight() - 20
    doc.setFontSize(9)
    doc.setTextColor(128, 128, 128)
    doc.text("MeteorGAR - Asteroid Impact Simulation Platform", pageWidth / 2, yPosition, { align: "center" })
    doc.text("Data sourced from NASA Near-Earth Object Program", pageWidth / 2, yPosition + 5, { align: "center" })

    // Generate PDF buffer
    const pdfBuffer = doc.output("arraybuffer")

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="MeteorGAR_Report.pdf"`,
      },
    })
  } catch (error) {
    console.error("[v0] Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
  }
}
