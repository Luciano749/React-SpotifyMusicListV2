import { createGlobalStyle } from "styled-components";

const ResetStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
        margin: 0;
    }

    ul,
    ol {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body {
        padding: 0;
    }

    [tabindex="-1"]:focus:not(:focus-visible) {
        outline: 0 !important;
    }

    img,
    iframe,
    video,
    figure,
    table,
    fieldset,
    hr {
        border: 0;
    }

    html {
        overflow-y: scroll;
        scroll-behavior: smooth;
    }

    button:focus:not(:focus-visible),
    input:focus:not(:focus-visible),
    textarea:focus:not(:focus-visible),
    select:focus:not(:focus-visible) {
        outline: 0;
    }


    *{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 62.5%;

        border: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

export default ResetStyles;
