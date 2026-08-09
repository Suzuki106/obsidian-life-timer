import { Plugin } from "obsidian";

const UPDATE_INTERVAL_MS = 1000;

function getNextTargetDate(): Date {
	const now = new Date();
	const year = now.getFullYear();
	// 今年9月29日
	const thisYear = new Date(`${year}-09-29T00:00:00`);
	if (thisYear.getTime() > now.getTime()) {
		// 今年还没到，返回今年
		return thisYear;
	}
	// 今年已经过了，返回明年
	return new Date(`${year + 1}-09-29T00:00:00`);
}

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
		const diffMs = getNextTargetDate().getTime() - now.getTime();

		if (diffMs <= 0) {
			this.statusBarItemEl.setText("🎂 生日快乐!");
			return;
		}

		const totalSeconds = Math.floor(diffMs / 1000);
		const days = Math.floor(totalSeconds / (24 * 60 * 60));
		const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
		const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
		const seconds = totalSeconds % 60;

		this.statusBarItemEl.setText(
			`距离下一次生日还有: ${days}天 ${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`,
		);
	}

	private pad(value: number): string {
		return value.toString().padStart(2, "0");
	}
}
