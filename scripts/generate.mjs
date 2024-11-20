import { writeFileSync } from 'fs'
import convert from 'color-convert'

/**
 * Converts HSL color values to a hexadecimal color code.
 *
 * @param {number} hue - The hue of the color, in degrees (0-360).
 * @param {number} saturation - The saturation of the color, as a percentage (0-100).
 * @param {number} lightness - The lightness of the color, as a percentage (0-100).
 * @return {string} The hexadecimal color code as a string.
 */
const color = (hue, saturation, lightness) => `#${convert.hsl.hex(hue, saturation, lightness)}`


const GRAY_HUE = 0
const GREEN_HUE = 143
const BLUE_HUE = 200
const PURPLE_HUE = 300
const BROWN_HUE = 30

const SATURATION = 20

const themes = [
  { color: 'gray', hue: GRAY_HUE },
  { color: 'green', hue: GREEN_HUE },
  { color: 'blue', hue: BLUE_HUE },
  { color: 'purple', hue: PURPLE_HUE },
  { color: 'brown', hue: BROWN_HUE }
]

const themesData = themes.map(theme => ({
  name: `tiho ${theme.color}`,
  fileName: `tiho-${theme.color}-color-theme.json`,
  colors: {
    background: {
      dark: color(theme.hue, SATURATION, 10),
      light: color(theme.hue, SATURATION, 15),
    },
    text: {
      normal: color(theme.hue, SATURATION, 60),
      light: color(theme.hue, SATURATION, 90),
      dark: color(theme.hue, SATURATION, 40)
    }
  }
}))

themesData.forEach(theme => {
  const actualTheme = {
    "name": theme.name,
    "colors": {
      "editor.background": theme.colors.background.dark,
      "editor.foreground": theme.colors.text.normal,
      "activityBar.background": theme.colors.background.dark, // tabs on side
      "activityBarBadge.background": theme.colors.background.dark,
      "sideBar.background": theme.colors.background.dark,
      "sideBarTitle.foreground":  theme.colors.text.normal,
      "tab.activeBackground": theme.colors.background.light,
      "tab.inactiveBackground": theme.colors.background.dark,
      "statusBar.background": theme.colors.background.dark,
      "panel.background": theme.colors.background.dark,
      "menubar.selectionBackground": theme.colors.background.dark,
      "editorGroupHeader.tabsBackground": theme.colors.background.dark,
      "titleBar.activeBackground": theme.colors.background.dark,
      "editorLink.activeForeground": theme.colors.text.normal,
      "dropdown.background": theme.colors.background.dark,

      "editorSuggestWidget.background": theme.colors.background.dark,
      "editorSuggestWidget.border": theme.colors.background.dark,
      "editorSuggestWidget.selectedBackground": theme.colors.background.light,
      "editorSuggestWidget.highlightForeground": theme.colors.text.light,
      "editorSuggestWidget.focusHighlightForeground": theme.colors.text.light,
      "editorSuggestWidget.selectedForeground": theme.colors.text.normal, 
      "editorSuggestWidget.selectedIconForeground": theme.colors.text.light,
    },
    "tokenColors": [
      {
        "name": "Comment",
        "scope": [
          "comment",
          "punctuation.definition.comment"
        ],
        "settings": {
          "foreground": theme.colors.text.dark
        }
      },
      {
        "name": "Keyword",
        "scope": [
          "keyword"
        ],
        "settings": {
          "foreground": theme.colors.text.light
        }
      },
    ]
  }
  const json = JSON.stringify(actualTheme, null, 2)
  const path = `./themes/${theme.fileName}`
  console.log(`writing ${path}`)
  writeFileSync(path, json)
})
