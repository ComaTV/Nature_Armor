export async function tornadoRun(e, p) {
    let rotation = p.getRotation()
    let grade = rotation.y
    if (grade <= 10 && grade >= -10) {
        let L = {
            Z:p.location.z,
            Y:p.location.y,
            X:p.location.x
        }
        let runZ = p.location.z
        let initialLZ = L.Z
        let run = system.runInterval(() => {
            e.teleport({z:runZ,y:L.Y,x:L.X})
            runZ++
            if (runZ - 20 == initialLZ) {
                system.clearRun(run)
                p.removeTag(Owner)
                e.kill()
            }
        }, 5)
    }
    if (grade >= 170 || grade <= -170) {
        let L = {
            Z:p.location.z,
            Y:p.location.y,
            X:p.location.x
        }
        let runZ = p.location.z
        let initialLZ = L.Z
        let run = system.runInterval(() => {
            e.teleport({z:runZ,y:L.Y,x:L.X})
            runZ--
            if (runZ + 20 == initialLZ) {
                system.clearRun(run)
                p.removeTag(Owner)
                e.kill()
            }
        }, 5)
    }
    if (grade >= 10 && grade < 170) {
        if (grade <= 80) {
            let L = {
                Z:p.location.z,
                Y:p.location.y,
                X:p.location.x
            }
            let runZ = p.location.z
            let runX = p.location.x
            let initialLZ = L.Z
            let initialLX = L.X
            let run = system.runInterval(() => {
                e.teleport({z:runZ,y:L.Y,x:runX})
                runZ++
                runX--
                if (runX + 15 == initialLX && runZ - 15 == initialLZ) {
                    system.clearRun(run)
                    p.removeTag(Owner)
                    e.kill()
                }
            }, 5)
        }
        if (grade >= 100) {
            let L = {
                Z:p.location.z,
                Y:p.location.y,
                X:p.location.x
            }
            let runZ = p.location.z
            let runX = p.location.x
            let initialLZ = L.Z
            let initialLX = L.X
            let run = system.runInterval(() => {
                e.teleport({z:runZ,y:L.Y,x:runX})
                runZ--
                runX--
                if (runX + 15 == initialLX && runZ + 15 == initialLZ) {
                    system.clearRun(run)
                    p.removeTag(Owner)
                    e.kill()
                }
            }, 5)
        }
        if (grade < 100 && grade > 80) {
            let L = {
                Z:p.location.z,
                Y:p.location.y,
                X:p.location.x
            }
            let runX = p.location.x
            let initialLX = L.X
            let run = system.runInterval(() => {
                e.teleport({z:L.Z,y:L.Y,x:runX})
                runX--
                if (runX + 20 == initialLX) {
                    system.clearRun(run)
                    p.removeTag(Owner)
                    e.kill()
                }
            }, 5)
        }
    }
    if (grade < -10 && grade > -170) {

        if (grade > -80) {
            let L = {
                Z:p.location.z,
                Y:p.location.y,
                X:p.location.x
            }
            let runZ = p.location.z
            let runX = p.location.x
            let initialLZ = L.Z
            let initialLX = L.X
            let run = system.runInterval(() => {
                e.teleport({z:runZ,y:L.Y,x:runX})
                runZ++
                runX++
                if (runX - 15 == initialLX && runZ - 15 == initialLZ) {
                    system.clearRun(run)
                    p.removeTag(Owner)
                    e.kill()
                }
            }, 5)
        }
        if (grade < -100) {
            let L = {
                Z:p.location.z,
                Y:p.location.y,
                X:p.location.x
            }
            let runZ = p.location.z
            let runX = p.location.x
            let initialLZ = L.Z
            let initialLX = L.X
            let run = system.runInterval(() => {
                e.teleport({z:runZ,y:L.Y,x:runX})
                runZ--
                runX++
                if (runX - 15 == initialLX && runZ + 15 == initialLZ) {
                    system.clearRun(run)
                    p.removeTag(Owner)
                    e.kill()
                }
            }, 5)
        }
        if (grade >= -100 && grade <= -80) {
            let L = {
                Z:p.location.z,
                Y:p.location.y,
                X:p.location.x
            }
            let runX = p.location.x
            let initialLX = L.X
            let run = system.runInterval(() => {
                e.teleport({z:L.Z,y:L.Y,x:runX})
                runX++
                if (runX - 20 == initialLX) {
                    system.clearRun(run)
                    p.removeTag(Owner)
                    e.kill()
                }
            }, 5)
        }
    }
}

export function tornadoMechanism(E) {
    const radius = 10;
    
    const entities = E.dimension.getEntities({
        location: E.location,
        maxDistance: radius
    });
    
    entities.forEach(async (entity) => {            
        if(entity.typeId !="sand:tornado" && !entity.hasTag(Owner)){
            try{
                entity.teleport({x:E.location.x,y:E.location.y+2,z:E.location.z})
                
                entity.applyDamage(5)
            }
            catch(e){}
        }
    });
}