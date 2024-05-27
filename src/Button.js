import React from "react";
import styled from "styled-components";

import { convertPixelsToRem } from "./constants";

import { COLORS } from "./constants";

// new approach!!
// use styling dict with css vars as key for size differences
// but use inherited styled components for overriding color, hover state etc., since CSS is much more flexible here;
// after swapping out the component based on the variant, the CSS is always located in the new component, which makes
// changes very easy - also styled components handles css specification tricks for us!

const Sizes = {
  Large: "large",
  Medium: "medium",
  Small: "small",
};

const Variants = {
  Fill: "fill",
  Outline: "outline",
  Ghost: "ghost",
};

const borderSize = 2;

// this makes overview much easier - you don't have to look for the style properties and then sizes,
// but sizes first - which is the primary interest here
const sizes = {
  [Sizes.Large]: {
    "--fontSize": `${convertPixelsToRem(21)}rem`,
    "--padding": `${20 - borderSize}px ${36 - borderSize}px`,
    "--radius": "4px",
  },
  [Sizes.Medium]: {
    "--fontSize": `${convertPixelsToRem(18)}rem`,
    "--padding": `${16 - borderSize}px ${24 - borderSize}px`,
    "--radius": "2px",
  },
  [Sizes.Small]: {
    "--fontSize": `${convertPixelsToRem(16)}rem`,
    "--padding": `${8 - borderSize}px ${16 - borderSize}px`,
    "--radius": "2px",
  },
};

const Button = ({ variant, size, children }) => {
  let ChosenButton = FillButton;

  const sizeVars = sizes[size];

  if (variant === Variants.Outline) {
    ChosenButton = OutlineButton;
  } else if (variant === Variants.Ghost) {
    ChosenButton = GhostButton;
  }
  return <ChosenButton style={sizeVars}>{children}</ChosenButton>;
};

const FillButton = styled.button`
  // font
  font-size: var(--fontSize);
  font-family: Roboto, sans-serif;
  text-transform: uppercase;

  // colors
  background-color: ${COLORS.primary};
  color: ${COLORS.white};

  // dimensions
  padding: var(--padding);

  // border
  // by declaring a transparent border here, the base class FillButton provides the correct dimensions for all buttons, since
  // the border is added to its width - but it does not show, since it's transparent
  // this is a very neat trick
  // subclasses can just also declare the border, but with the color they want to have
  border: ${borderSize}px solid transparent;
  border-radius: var(--radius);

  &:focus {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 3px;
  }

  &:hover {
    background-color: ${COLORS.primaryLight};
  }
`;

const OutlineButton = styled(FillButton)`
  background-color: ${COLORS.white};
  color: ${COLORS.primary};

  border: 2px solid ${COLORS.primary};

  &:hover {
    background-color: ${COLORS.offwhite};
  }
`;

const GhostButton = styled(FillButton)`
  background-color: transparent;
  color: ${COLORS.gray};

  &:focus {
    outline: 2px solid ${COLORS.gray};
  }

  &:hover {
    background-color: ${COLORS.transparentGray15};
    color: ${COLORS.black};
  }
`;

export default Button;
