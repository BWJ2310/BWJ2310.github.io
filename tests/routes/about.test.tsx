import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import AboutPage from "@/app/about/page"

describe("AboutPage", () => {
  it("matches the source about page content structure", () => {
    render(<AboutPage />)

    expect(screen.getByText("About Me")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Breath in ... Breath out ... One enjoying the moment",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "The world is full of adventures, and I can't wait to explore. I have been building my life story with the resources and skills I have, and I'm confident about what I can accomplish next."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Looking forward to experiencing all the excitement with you someday."
      )
    ).toBeInTheDocument()

    expect(screen.getByText("Developer")).toBeInTheDocument()
    expect(screen.getByText("- TradingGoose, Localhost")).toBeInTheDocument()
    expect(screen.getByText("November 2025 - present")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Full-stack developer for TradingGoose-Studio and TradingGoose-Market."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Designed and developed open-source agentic workflows for technical-analysis trading."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Built a cross-platform financial asset identity normalization system designed to work across platforms."
      )
    ).toBeInTheDocument()

    expect(screen.getByText("Product Designer")).toBeInTheDocument()
    expect(screen.getByText("- AirTurn, Boulder, CO, US")).toBeInTheDocument()
    expect(screen.getByText("July 2023 - present")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Designed musician control devices and tripod stand products."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Used Fusion 360 to produce manufacturing-ready 3D file packages and engineering drawings."
      )
    ).toBeInTheDocument()

    const tradingGooseHeading = screen.getByRole("heading", {
      level: 2,
      name: "Developer",
    })
    const airTurnHeading = screen.getByRole("heading", {
      level: 2,
      name: "Product Designer",
    })
    expect(
      tradingGooseHeading.compareDocumentPosition(airTurnHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()

    expect(
      screen.getByText("System and UI/UX design, Product Manager")
    ).toBeInTheDocument()
    expect(screen.getByText("- CS Pet Tech, Shenzhen, CN")).toBeInTheDocument()
    expect(screen.getByText("January 2021 - August 2021")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Built a scheduling workflow that lets pet groomers choose working spaces and times while customers book appointments without time or space conflicts."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "The final product met all design objectives and was built within a $12,000 budget for business customers."
      )
    ).toBeInTheDocument()

    expect(screen.getByText("Investment Researcher")).toBeInTheDocument()
    expect(
      screen.getByText("- Lianjiang Capital, Shenzhen, CN")
    ).toBeInTheDocument()
    expect(screen.getByText("Robotic Team Mentor")).toBeInTheDocument()
    expect(
      screen.getByText("- Shenzhen Foreign Language School, Shenzhen, CN")
    ).toBeInTheDocument()
    expect(screen.getByText("January 2018 - March 2020")).toBeInTheDocument()

    expect(
      screen.getByRole("heading", { level: 2, name: "Accomplishment" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 3, name: "Entrepreneurship" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { level: 3, name: "Competitions" })
    ).toBeInTheDocument()

    expect(screen.getByText("Mechanical Engineering")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Undergraduate student at the University of Colorado, Boulder."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText("Trying my best to balance school, work, and life.")
    ).toBeInTheDocument()
  })

  it("does not use placeholder narrative from the earlier rebuild", () => {
    render(<AboutPage />)

    expect(
      screen.queryByText(/Adventure as a working method/i)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/Signals from the work/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/original portfolio/i)).not.toBeInTheDocument()
    expect(screen.queryByText("Hi! This's Jun")).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        "I'm a regular human being looking for making an interesting story out of my life."
      )
    ).not.toBeInTheDocument()
    expect(screen.queryByText("To Be Continued ...")).not.toBeInTheDocument()
    expect(screen.queryByAltText("Blue Surface")).not.toBeInTheDocument()
    expect(
      screen.queryByAltText("Jun personal portfolio moment")
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { level: 3, name: "Personal Experience" })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        "- Wall painting for decorating the school dining center"
      )
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        "- Designed and constructed an FRC robot within 6 hours"
      )
    ).not.toBeInTheDocument()
  })
})
