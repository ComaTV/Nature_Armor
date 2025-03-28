import { system, world, EquipmentSlot, EntityComponentTypes } from "@minecraft/server";
import { sandKnockBack, blidnessAttack, sandUltAni } from "./abilities.js";
import { tornadoRun, tornadoMechanism } from "./tornado.js";
import { hasArmor } from "./utils.js";

const score = {
    armorType: "armorType",
    armorAbility: "armorAbility",
}

const abilityName = [
    "§3Sand Knockback",
    "§5Sand Blindness",
    "§eSand Storm"
]

const armor = {
    head:"environment_armor:head",
    chest:"environment_armor:chest",
    legs:"environment_armor:legs",
    boots:"environment_armor:boots"
}
//-------Initialization--------

world.afterEvents.worldLoad.subscribe(() => {
    world.scoreboard.addObjective(score.armorType);
    world.scoreboard.addObjective(score.armorAbility);
})
system.runInterval(() => {
    world.getPlayers().forEach(player => {
        player.runCommand(`gamerule showtags false`);
        player.runCommand(`gamerule commandblockoutput false`);
        player.runCommand(`gamerule sendcommandfeedback false`);
        if (player.hasTag(Freeze)) {
            player.runCommand(`tp @s @s`)
        }
    });
});

//-------Start--------
let Freeze = "Freeze"
let Owner = "Owner"
let Sendish = 'Sendish'
let ability = {
    second: "second",
    ult: "ult"
}
let SandFog = {
    name:"sand",
    id:"sand:storm"
}
let SandUI = 'sand'
let c = 0;
world.afterEvents.itemUse.subscribe(async ({source}) => {
    try{
        const equipmentCompPlayer = source.getComponent(EntityComponentTypes.Equippable);

        if (hasArmor(equipmentCompPlayer, armor)) {
            if (source.isSneaking) {
                source.sendMessage(`Your ability are ${abilityName[c]}`)
                source.playSound("random.levelup")
                source.addTag(ability.second)
                world.scoreboard.getObjective(score.armorAbility).setScore(source,c);
                if(c < 2) c++;
                else c = 0;
            }
            else {
                const getS = world.scoreboard.getObjective(score.armorAbility).getScore(source);
                switch (getS) {
                    case 0:
                        source.sendMessage("§aSand Knockback")
                        sandKnockBack(source)
                        break;
                    case 1:
                        if(source.hasTag(ability.second)){
                            blidnessAttack(source)
                        }
                        break;
                    case 2:
                        if(source.hasTag(ability.ult)){
                            await sandUltAni(source)
                            await system.waitTicks(60)
                            source.removeTag(Freeze)
                            source.removeTag(ability.ult)
                            const entityId = world.getDimension("overworld")
                                .spawnEntity("sand:tornado",source.location).id
                            const entity = world.getEntity(entityId)
                            source.addTag(Owner)
                            tornadoRun(entity,source)
                        }
                        if(!source.hasTag(ability.ult)) source.sendMessage("§cYou need to charge your §eULT§c with §dEpic§c ability")
                        break;
                }
            }
        }
    }
    catch(err){}
})

system.runInterval(() => {
    const entities = world.getDimension("overworld").getEntities();
    entities.forEach((entity) => {
        if (entity.typeId == "sand:tornado") {
            tornadoMechanism(entity);
        }
    });
});

//Sand Effect
system.runInterval(() => {
    const players = world.getPlayers()
    players.forEach(async(p) => {
        if (p.hasTag(Sendish)) {
            p.runCommand(`title @s title ${SandUI}`)
            p.runCommand(`fog @s push ${SandFog.id} ${SandFog.name}`)
            await system.waitTicks(160)
            p.removeTag(Sendish)
        }
        if (!p.hasTag(Sendish))
        {
            p.runCommand(`title @s clear`)
            p.runCommand(`fog @s remove ${SandFog.name}`)
        }
    })
})