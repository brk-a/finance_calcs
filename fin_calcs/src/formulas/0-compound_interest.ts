export const compound = (p: number, i: number, n: number): number => {
    return p * Math.pow(1 + (i/100), n)
}

export const discount = (p: number, i: number, n: number): number => {
    return p * Math.pow(1 + (i/100), -n)
}

export const compoundFactor = (i: number, n: number): number => {
    return Math.pow(1 + (i/100), n)
}

export const discountFactor = (i: number, n: number): number => {
    return Math.pow(1 + (i/100), -n)
}

export const d = (i: number) : number => {
    return (i/100) / (1+(i/100))
}

export const iMthly = (i: number, m: number): number => {
    const mthlyCompound = compoundFactor(i, 1/m)
    return m * (mthlyCompound - 1)
}

export const dMthly = (i: number, m: number): number => {
    const iM = iMthly(i, m)
    return iM / (1+iM)
}

export const forceOfInterest = (i: number): number => {
    return Math.log(1+(i/100))
}

export const annuityDuePV = (i: number, n: number): number => {
    const annImmPV = annuityImmediatePV(i, n)
    return (1+(i/100)) * annImmPV
}

export const annuityDueFV = (i: number, n: number): number => {
    const annImmFV = annuityImmediateFV(i, n)
    return (1+(i/100)) * annImmFV
}

export const mthlyAnnuityDuePV = (i: number, m: number, n: number): number => {
    const mthlyAnnImmPV = mthlyAnnuityImmediatePV(i, m, n)
    const mthlyCompound = compoundFactor(i, 1/m)
    return mthlyCompound * mthlyAnnImmPV
}

export const mthlyAnnuityDueFV = (i: number, m: number, n: number): number => {
    const mthlyAnnDuePV = mthlyAnnuityDuePV(i, m, n)
    const compound = compoundFactor(i, n)
    return compound * mthlyAnnDuePV
}

export const annuityImmediatePV = (i: number, n: number): number => {
    const vN = discountFactor(i, n)
    return (1-vN) / (i/100)
}

export const annuityImmediateFV = (i: number, n: number): number => {
    const cpdFactor = compoundFactor(i, n)
    return (cpdFactor - 1) / (i/100)
}

export const mthlyAnnuityImmediateFV = (i: number, m: number, n: number): number => {
    const annImmFV = annuityImmediateFV(i, n)
    const iM = iMthly(i, m)
    return ((1/100) / iM) * annImmFV
}

export const mthlyAnnuityImmediatePV = (i: number, m: number, n: number): number => {
    const annImmPV = annuityImmediatePV(i, n)
    const iM = iMthly(i, m)
    return ((i/100) / iM) * annImmPV
}

export const perpetuityImmediatePV = (i: number) : number => {
    return 1 / (i/100)
}

export const perpetuityDuePV = (i: number) : number => {
    const dd = d(i)
    return 1 / dd
}

export const deferredAnnuityImmediatePV = (i: number, n: number, m: number) : number => {
    const annMPlusN = annuityImmediatePV(i, m+n)
    const annM = annuityImmediatePV(i, m)
    return annMPlusN - annM
}

export const deferredAnnuityDuePV = (i: number, n: number, m: number) : number => {
    const vM = discountFactor(i, m)
    const annN = annuityDuePV(i, n)
    return vM * annN
}

export const mthlyDeferredAnnuityImmediatePV = (i: number, m: number, n: number, q: number): number => {
    const mthlyAnnImmPV = mthlyAnnuityImmediatePV(i, m, n)
    const vQ = discountFactor(i, q)
    return vQ * mthlyAnnImmPV
}

export const mthlyDeferredAnnuityDuePV = (i: number, m: number, n: number, q: number): number => {
    const mthlyAnnDuePV = mthlyAnnuityDuePV(i, m, n)
    const vQ = discountFactor(i, q)
    return vQ * mthlyAnnDuePV
}

export const continuousAnnuityPV = (i: number, n: number): number => {
    const force = forceOfInterest(i)
    const annImmPV = annuityImmediatePV(i, n)
    return ((i/100)/force) * annImmPV
}

export const deferredContinuousAnnuityPV = (i: number, n: number, q: number): number => {
    const contAnnQN = continuousAnnuityPV(i, q+n)
    const contAnnQ = continuousAnnuityPV(i, q)
    return contAnnQN - contAnnQ
}

export const continuousAnnuityFV = (i: number, n: number): number => {
    const force = forceOfInterest(i)
    const annImmFV = annuityImmediateFV(i, n)
    return ((i/100)/force) * annImmFV
}
