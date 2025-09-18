import { themeQuartz, iconSetQuartzLight } from 'ag-grid-community';

// to use myTheme in an application, pass it to the theme grid option
export const myTheme = themeQuartz
.withPart(iconSetQuartzLight)
.withParams({
    accentColor: "#53CDDD",
    backgroundColor: "#FFFFFF",
    borderColor: "#00000030",
    borderRadius: 0,
    browserColorScheme: "light",
    cellHorizontalPaddingScale: 0.9,
    chromeBackgroundColor: {
        ref: "backgroundColor"
    },
    columnBorder: true,
    fontFamily: [
        "Arial",
        "sans-serif"
    ],
    fontSize: 12,
    foregroundColor: "#2E3338",
    headerBackgroundColor: "#FFFFFF",
    headerFontSize: 12,
    headerFontWeight: 700,
    headerTextColor: "#000000C9",
    oddRowBackgroundColor: "#D9D9D91C",
    rowBorder: true,
    rowVerticalPaddingScale: 0.8,
    sidePanelBorder: true,
    spacing: 5,
    wrapperBorder: true,
    wrapperBorderRadius: 4
});
