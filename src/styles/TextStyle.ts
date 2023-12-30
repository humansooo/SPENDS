import { StyleSheet } from "react-native";

const base = {
    color: "#ffffff",
    fontFamily: "Montserrat_400Regular",
}

const baseBold = {
    color: "#ffffff",
    fontFamily: "Montserrat_700Bold",
}

const baseLight = {
    color: "#ffffff",
    fontFamily: "Montserrat_300Light",
}

const baseSemiBold = {
    color: "#ffffff",
    fontFamily: "Montserrat_600SemiBold",
}

export const TextStyle = StyleSheet.create({
    smSemiBold:{
        fontSize: 16,
        
        ...baseSemiBold,
    },
    mdSemiBold:{
        fontSize: 24,
        ...baseSemiBold,
    },
    lgSemiBold:{
        fontSize: 32,
        ...baseSemiBold,
    },
    xlSemiBold:{
        fontSize: 40,
        ...baseSemiBold,
    },
    sm:{
        fontSize: 16,
        ...base,
    },
    smBold:{
        fontSize: 16,
        ...baseBold,
    },
    smLight:{
        fontSize: 16,
        ...baseLight,
    },
    md:{
        fontSize: 24,
        ...base,
    },
    mdBold:{
        fontSize: 24,
        ...baseBold,
    },
    mdLight:{
        fontSize: 24,
        ...baseLight,
    },
    lg:{
        fontSize: 32,
        ...base,
    },
    lgBold:{
        fontSize: 32,
        ...baseBold,
    },
    lgLight:{
        fontSize: 32,
        ...baseLight,
    },
    xl:{
        fontSize: 40,
        ...base,
    },
    xlBold:{
        fontSize: 40,
        ...baseBold,
    },
    xlLight:{
        fontSize: 40,
        ...baseLight,
    },
})
