import { useSettingsStore } from "@/stores/settings"
import { generateColors, setColors } from "@/utils/color"

export const useGenerateTheme = () => {
  const store = useSettingsStore()
  const theme = computed(() => store.settings.theme) // 用户选择主题（新）
  const originalTheme = computed(() => store.settings.originalTheme) // 原始主题（当前）
  const generateTheme = (primary: string) => {
    // 根据当前主题生成
    const colors = Object.assign(
      { primary: theme.value },
      generateColors(primary)
    )
    setColors(colors)
  }
  // 若用户选择的主题与当前的主题不一致，则重新生成
  if (theme.value !== originalTheme.value) {
    generateTheme(theme.value)
    // 同步最新的主题到store
    store.changeSetting({ key: "originalTheme", value: theme.value })
  }

  return { generateTheme }
}
