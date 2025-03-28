export function hasArmor(equipmentCompPlayer, armor) {
    return (
        equipmentCompPlayer.getEquipment(EquipmentSlot.Head).typeId == armor.head &&
        equipmentCompPlayer.getEquipment(EquipmentSlot.Chest).typeId == armor.chest &&
        equipmentCompPlayer.getEquipment(EquipmentSlot.Legs).typeId == armor.legs &&
        equipmentCompPlayer.getEquipment(EquipmentSlot.Feet).typeId == armor.boots
    );
}