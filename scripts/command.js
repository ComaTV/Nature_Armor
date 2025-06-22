import { world,system } from "@minecraft/server";
import { spinWeal } from "./wheal";

const tag = "spin_weal"
world.afterEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender;
    switch (eventData.message) {
        case "spin_weal":
            player.addTag(tag)
            break;
    }
});

system.runInterval(() => {
    world.getPlayers().forEach(player => {
        if (player.hasTag(tag)) {
            spinWeal(player, tag)
        }
    })
},10)