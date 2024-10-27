import { SvelteSet } from "svelte/reactivity";
import { expect, test } from "vitest";

class Group {
	selected = new SvelteSet<string>();
}

class Item {
	group: Group;
	id: string;

	constructor(group: Group, id: string) {
		this.group = group;
		this.id = id;
	}

	#selected = $derived.by(() => this.group.selected.has(this.id));

	get selected() {
		return this.#selected;
	}

	set selected(value: boolean) {
		if (value) {
			this.group.selected.add(this.id);
		} else {
			this.group.selected.delete(this.id);
		}
	}
}

test("Item.selected", () => {
	const cleanup = $effect.root(() => {
		const group = new Group();
		const item = new Item(group, "foo");

		expect(group.selected.has("foo")).toBe(false);
		expect(item.selected).toBe(false);

		item.selected = true;
		expect(group.selected.has("foo")).toBe(true);
		expect(item.selected).toBe(true);

		item.selected = false;
		expect(group.selected.has("foo")).toBe(false);
		expect(item.selected).toBe(false);
	});

	cleanup();
});
