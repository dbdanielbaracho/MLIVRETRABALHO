export const VERTICAL_PACKS={
hospitality:{roles:['waiter','bartender','kitchen_assistant'],operationalSkills:['guest_service','station_setup','order_accuracy'],defaultShiftMinutes:480,attendance:'check_in_out',teamPlanning:true,active:true},
cleaning_facilities:{roles:['cleaner'],operationalSkills:['sanitation','room_reset','waste_handling'],defaultShiftMinutes:480,attendance:'check_in_out',teamPlanning:true,active:true},
events:{roles:['waiter','bartender','cleaner'],operationalSkills:['guest_service','setup','teardown'],defaultShiftMinutes:360,attendance:'check_in_out',teamPlanning:true,active:true},
logistics_warehouse:{roles:['warehouse_associate'],operationalSkills:['picking','packing','inventory_handling'],defaultShiftMinutes:480,attendance:'check_in_out',teamPlanning:true,active:false},
retail:{roles:['store_associate'],operationalSkills:['customer_service','stocking','checkout'],defaultShiftMinutes:480,attendance:'check_in_out',teamPlanning:true,active:false}
} as const;