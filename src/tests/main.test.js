import { it, describe } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Main from "../components/mainDOM";

describe("Main Component", () => {
    it("it should display a correct image when a thumnail is clicked", () => {
        render(<Main />);

        const thumnails = screen.getByRole("img").filter((img) => img.alt.includes("thumbnail") )
    

    expect(thumnails.length).toBeGreaterThan(0);

    thumnails.forEach((thumb, index) => {
        fireEvent.click(thumb);


        const mainImage = screen.getByAltText("main product");

        const expectedImageName = `image-product-${index + 1}.jpg`;

        expect(mainImage.src).toContain(expectedImageName);
    })
    })
})