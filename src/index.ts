type RequestMessage = {
	action: string;
}

type ResponseMessage = {
	method: string;
	status?: boolean;
	sid?: string;
	connectedDate?: Date;
	countedDate?: Date;
}

class CountClient
{
	private sid: string | undefined;
	private count: number;

	private connectedUrl: string;
	private ws: WebSocket;
	
	constructor()
	{
		this.connectedUrl = 'ws://' + process.env.SIP + ':' + process.env.PORT;
		
		this.ws = new WebSocket(this.connectedUrl);

		this.ws.onopen = (event: Event): void => this.openHandler(event);
		this.ws.onmessage = (event: MessageEvent): void => this.messageHandler(event);
		this.ws.onerror = (event: Event): void => this.errorHandler(event);

		this.count = 0;
	}

	protected openHandler(event: Event): void
	{
		let elementArray: Array<HTMLElement | null> = [];

		const disconnectedHint: HTMLElement | null = document.getElementById('disconnected-hint');
		elementArray.push(disconnectedHint);

		this.addElementsClass(elementArray, 'hide');
	}

	protected messageHandler(event: MessageEvent): void
	{
		const message: ResponseMessage = JSON.parse(event.data.toString());

		const method: string = message['method'];
		switch (method) {
			case 'getToken':
				this.sid = message['sid'];
				console.log(`[Receive Token] sid: ${this.sid}`);

				const sidLabel: HTMLElement | null = document.getElementById('sid');
				this.updateElementValue(sidLabel, `SID: ${this.sid}`);

				let elementArray: Array<HTMLElement | null> = [];

				const headSection: HTMLElement | null = document.getElementById('head-sec');
				elementArray.push(headSection);

				const contentSection: HTMLElement | null = document.getElementById('content-sec');
				elementArray.push(contentSection);

				this.removeElementsClass(elementArray, 'hide');
				break;
			case 'plus': 
				if (message['status']) {
					this.count += 1;
					console.log(`[Plus Count] count: ${this.count}`);

					const countHint: HTMLElement | null = document.getElementById('count-hint');
					this.updateElementValue(countHint, `COUNT = ${this.count}`);
				}
				break;
			default:
				console.log(`[Method Undefined] method: ${method}`);
				break;
		}
	}

	protected errorHandler(event: Event): void
	{
		console.log(`[Connected Failed]`);

		const disconnectedHint: HTMLElement | null = document.getElementById('disconnected-hint');
		this.updateElementValue(disconnectedHint, 'Can not connect to server !');
	}

	private addElementsClass(elementArray: Array<HTMLElement | null>, className: string): void
	{
		elementArray.forEach((element: HTMLElement | null) => {
			if (element) {
				element.classList.add(className);
			}
		});
	}

	private removeElementsClass(elementArray: Array<HTMLElement | null>, className: string): void
	{
		elementArray.forEach((element: HTMLElement | null) => {
			if (element) {
				element.classList.remove(className);
			}
		});
	}

	private updateElementValue(element: HTMLElement | null, value: string): void
	{
		if (element) {
			element.innerHTML = value;
		}
	}

	public countPlus(): void
	{
		const request: RequestMessage = {
			action: 'plus',
		}

		this.ws.send(JSON.stringify(request));
	}
}

document.addEventListener('DOMContentLoaded', (e: Event): void => {
	const client = new CountClient();

	const countBtn: HTMLElement | null = document.getElementById('pop-btn');
	if (countBtn) {
		countBtn.onclick = (): void => client.countPlus();
	}
});
