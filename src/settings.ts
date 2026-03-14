import { App, PluginSettingTab } from "obsidian";
import LifeTimerPlugin from "./main";

export class LifeTimerSettingTab extends PluginSettingTab {
	plugin: LifeTimerPlugin;

	constructor(app: App, plugin: LifeTimerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
	}
}
