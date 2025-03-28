export async function sandKnockBack(p) {
    p.playSound('mob.wither.shoot')
    await system.waitTicks(10)

    p.spawnParticle("sand:blidness",p.location)
    const radius = 20;
    
    const entities = p.dimension.getEntities({
        location: p.location,
        maxDistance: radius
    });
    for (const e of entities) {
        if(e.id == p.id || e.typeId == "minecraft:xp_orb" || e.typeId == "minecraft:item") continue;
        e.applyKnockback({x:0,z:0},0.75)
        e.applyDamage(5)
    }
}

export async function blidnessAttack(p) {
    await system.waitTicks(40)
    p.spawnParticle("sand:blidness",p.location)
    const radius = 20;
    
    const entities = p.dimension.getEntities({
        location: p.location,
        maxDistance: radius
    });
    entities.forEach((e) => {
        if(e.id != p.id)
        {
            e.addTag(Sendish)
            e.runCommand('effect @s slowness 10 3')
            e.applyDamage(5)
        }
    })
}

export async function sandUltAni(p) {
    p.addTag(Freeze)
    await system.waitTicks(5)
    const colorCam = "145 132 96"
    p.playSound('sandStorm')
    p.addTag(Sendish)
    p.runCommand(`camera @s fade color ${colorCam}`)
    await system.waitTicks(20)
    p.runCommand(`camera @s set minecraft:free ease 1 in_cubic pos ^^1^5 facing @s`)
    await system.waitTicks(20)
    p.playSound('mob.wither.shoot')
    p.runCommand(`camera @s set minecraft:free ease 2.5 in_cubic pos ^^1^3 facing @s`)
    p.runCommand(`camera @s fade color ${colorCam}`)
    p.playSound('mob.wither.shoot')
    await system.waitTicks(20)
    p.playSound('sandStorm')
    p.runCommand(`camera @s set minecraft:free ease 2.5 in_cubic pos ^^1.5^1 facing @s`)
    p.playSound('mob.wither.shoot')
    await system.waitTicks(20)
    p.camera.clear()
}