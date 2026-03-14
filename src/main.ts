import { Plugin } from "obsidian";

const TARGET_DATE = new Date("2035-09-29T00:00:00");
const UPDATE_INTERVAL_MS = 1000;

export default class LifeTimerPlugin extends Plugin {
	private statusBarItemEl: HTMLElement | null = null;
	private intervalId: number | null = null;

	async onload(): Promise<void> {
		this.statusBarItemEl = this.addStatusBarItem();
		this.updateCountdown();

		this.intervalId = window.setInterval(() => {
			this.updateCountdown();
		}, UPDATE_INTERVAL_MS);

		this.registerInterval(this.intervalId);
	}

	onunload(): void {
		if (this.statusBarItemEl) {
			this.statusBarItemEl.empty();
		}
	}

	private updateCountdown(): void {
		if (!this.statusBarItemEl) return;

		const now = new Date();
		const diffMs = TARGET_DATE.getTime() - now.getTime();

		if (diffMs <= 0) {
			this.statusBarItemEl.setText("Life Timer: 倒计时已结束");
			return;
		}

		const totalSeconds = Math.floor(diffMs / 1000);
		const days = Math.floor(totalSeconds / (24 * 60 * 60));
		const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
		const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
		const seconds = totalSeconds % 60;

		this.statusBarItemEl.setText(
			`距离十年结束还有: ${days}天 ${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`,
		);
	}

	private pad(value: number): string {
		return value.toString().padStart(2, "0");
	}
}
