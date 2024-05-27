import React from "react";
import styled from "styled-components";

import { COLORS, convertPixelsToRem } from "./constants";

const Sizes = {
  Large: "large",
  Medium: "medium",
  Small: "small",
};

const paddingSizes = {
  [Sizes.Large]: "20px 36px",
  [Sizes.Medium]: "16px 24px",
  [Sizes.Small]: "8px 16px",
};

const fontSizes = {
  [Sizes.Large]: `${convertPixelsToRem(21)}rem`,
  [Sizes.Medium]: `${convertPixelsToRem(18)}rem`,
  [Sizes.Small]: `${convertPixelsToRem(16)}rem`,
};

const radiusDict = {
  [Sizes.Large]: "4px",
  [Sizes.Medium]: "2px",
  [Sizes.Small]: "2px",
};

const Variants = {
  Fill: "fill",
  Outline: "outline",
  Ghost: "ghost",
};

const backgroundColors = {
  [Variants.Fill]: COLORS.primary,
  [Variants.Outline]: COLORS.white,
  [Variants.Ghost]: COLORS.transparent,
};

const fontColors = {
  [Variants.Fill]: COLORS.white,
  [Variants.Outline]: COLORS.primary,
  [Variants.Ghost]: COLORS.gray,
};

const Button = ({ variant, size, children }) => {
  /* dimensions */
  let paddingSize = paddingSizes[size];
  const fontSize = fontSizes[size];
  const radius = radiusDict[size];

  /* colors */
  const backgroundColor = backgroundColors[variant];
  const fontColor = fontColors[variant];

  /* border */
  let border = "none";

  const outlineColor =
    variant === Variants.Ghost ? COLORS.transparentGray75 : COLORS.primary;

  if (variant === "outline") {
    const borderWidthPixels = 2;
    border = `${borderWidthPixels}px solid ${fontColor}`;

    // ensure that button is exact same width in outline mode
    // so even when border is applied, it is not wider than fill mode
    const paddings = paddingSize.split(" ");
    let paddingTopBottom = paddings[0].replace("px", "");
    let paddingLeftRight = paddings[1].replace("px", "");

    let paddingTopBottomModified = `${parseInt(paddingTopBottom) - borderWidthPixels}px`;
    let paddingLeftRightModified = `${parseInt(paddingLeftRight) - borderWidthPixels}px`;
    paddingSize = `${paddingTopBottomModified} ${paddingLeftRightModified}`;
  }

  return (
    <StyledButton
      variant={variant}
      size={size}
      style={{
        "--padding-size": paddingSize,
        "--font-size": fontSize,
        "--radius": radius,
        "--background-color": backgroundColor,
        "--font-color": fontColor,
        "--border": border,
        "--outline-color": outlineColor,
      }}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  box-sizing: border-box;

  // border
  border-radius: var(--radius);
  border: var(--border);

  // fonts
  font-weight: 500;
  font-size: var(--font-size);
  font-family: "Roboto Light", Roboto, sans-serif;
  text-transform: uppercase;

  // dimensions
  padding: var(--padding-size);

  // color
  background-color: var(--background-color);
  color: var(--font-color);

  &:focus {
    outline: 2px solid var(--outline-color);
    outline-offset: 2px;
  }
`;

// TODO: I solved this one using JS and quite a bit of styling logic
// However, one could make a base button with styled-components, and extend that.
// The extensions will always win the specificity wars, so that properties are overrideable as wanted.

export default Button;
