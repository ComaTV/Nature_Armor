import { ModalFormData, ActionFormData} from "@minecraft/server-ui";

export async function spinWeal(player, tag) {
    const form = new ActionFormData()
        .title("Weal")
        .body("Select a prize to claim!")
        for (let i = 0; i < 11; i++) {
            form.button(`butonuuu ${i}`,"textures/ui/gift_square")
        }
        const result = await form.show(player);
        if (result.canceled) return;
        player.removeTag(tag);
}