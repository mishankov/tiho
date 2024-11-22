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
  { color: 'gray', hue: GRAY_HUE, saturation: 0 },
  { color: 'green', hue: GREEN_HUE, saturation: SATURATION },
  { color: 'blue', hue: BLUE_HUE, saturation: SATURATION },
  { color: 'purple', hue: PURPLE_HUE, saturation: SATURATION },
  { color: 'brown', hue: BROWN_HUE, saturation: SATURATION },
]

const themesData = themes.map(theme => ({
  name: `tiho ${theme.color}`,
  fileName: `tiho-${theme.color}-color-theme.json`,
  colors: {
    background: {
      dark: color(theme.hue, theme.saturation, 10),
      light: color(theme.hue, theme.saturation, 15),
    },
    text: {
      dark: color(theme.hue, theme.saturation, 40),
      normal: color(theme.hue, theme.saturation, 60),
      light: color(theme.hue, theme.saturation, 90),
    }
  }
}))

themesData.forEach(theme => {
  const actualTheme = {
    "name": theme.name,
    "colors": {
      // editor
      "editor.background": theme.colors.background.dark,
      "editor.foreground": theme.colors.text.normal,
      "editor.selectionBackground": theme.colors.background.light,
      "editorGroupHeader.tabsBackground": theme.colors.background.dark,
      "editorLink.activeForeground": theme.colors.text.normal,
      
      // editor suggestions
      "editorSuggestWidget.background": theme.colors.background.dark,
      "editorSuggestWidget.border": theme.colors.background.dark,
      "editorSuggestWidget.selectedBackground": theme.colors.background.light,
      "editorSuggestWidget.highlightForeground": theme.colors.text.light,
      "editorSuggestWidget.focusHighlightForeground": theme.colors.text.light,
      "editorSuggestWidget.selectedForeground": theme.colors.text.normal, 
      "editorSuggestWidget.selectedIconForeground": theme.colors.text.light,

      // primarty side bar
      "activityBar.background": theme.colors.background.dark,
      "activityBar.foreground": theme.colors.text.normal,
      "activityBarBadge.background": theme.colors.background.dark,
      "sideBar.background": theme.colors.background.dark,
      "sideBar.foreground": theme.colors.text.normal,
      "sideBarTitle.foreground":  theme.colors.text.normal,
      "sideBarSectionHeader.background": theme.colors.background.dark,
      
      // bottom status bar 
      "statusBar.background": theme.colors.background.dark,
      "statusBar.foreground": theme.colors.text.normal,

      // stuff around editor
      "tab.activeBackground": theme.colors.background.light,
      "tab.inactiveBackground": theme.colors.background.dark,
      "panel.background": theme.colors.background.dark,
      "menubar.selectionBackground": theme.colors.background.dark,
      "titleBar.activeBackground": theme.colors.background.dark,
      
      // quick input
      "quickInput.background": theme.colors.background.dark,
      "quickInput.foreground": theme.colors.text.normal,
      "quickInputList.focusBackground": theme.colors.background.light,
      "quickInputList.focusForeground": theme.colors.text.normal,
      
      // terminal
      "terminal.selectionBackground": theme.colors.background.light,

      // common
      "scrollbar.shadow": theme.colors.background.dark,
      "list.hoverBackground": theme.colors.background.light,
      "list.activeSelectionBackground": theme.colors.background.light,
      "list.inactiveSelectionBackground": theme.colors.background.light,
      "list.highlightForeground": theme.colors.text.light,
      "dropdown.background": theme.colors.background.dark,
      "selection.background": theme.colors.background.light,
      "focusBorder": theme.colors.background.dark,

      // input
      "input.background": theme.colors.background.light,
      "input.foreground": theme.colors.text.normal,
      "input.border": theme.colors.background.dark,

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
          "keyword", 
          "entity.name.type",
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
