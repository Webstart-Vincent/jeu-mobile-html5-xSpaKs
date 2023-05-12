export class InputHandler {
    constructor() {
        /** @type {Set<Key>} */ this.keys = new Set();

        window.addEventListener("keydown", ({ code }) => {
            if (Object.keys(Key).includes(code)) this.keys.add(code);
        });

        window.addEventListener("keyup", ({ code }) => {
            this.keys.delete(code);
        });
    }
}

export const Key = Object.freeze({
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowUp: "ArrowUp",
    ArrowRight: "ArrowRight",
    Space: "Space",
    Enter: "Enter",
});
