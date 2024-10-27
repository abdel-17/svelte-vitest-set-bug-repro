<script lang="ts">
	import { SvelteSet } from "svelte/reactivity";

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

	const group = new Group();
	const item = new Item(group, "foo");

	$inspect("item.selected", item.selected);
	$inspect("group.selected.has(item.id)", group.selected.has(item.id));
</script>

<p>item.selected: {item.selected}</p>
<p>group.selected.has(item.id): {group.selected.has(item.id)}</p>

<button
	onclick={() => {
		item.selected = !item.selected;
	}}
>
	Toggle
</button>
