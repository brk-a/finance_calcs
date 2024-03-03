import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { mthlyDeferredAnnuityImmediatePV, iMthly } from "../formulas/0-compound_interest"
import React from "react"

const MthlyDeferredImmediatePV = () => {
    const [i, setI] = useState(0)
    const [n, setN] = useState(0)
    const [m, setM] = useState(0)
    const [q, setQ] = useState(0)
    const [iM, setIM] = useState(0)
    const [mthlyDefAnnImmPV, setMthlyDefAnnImmPV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculateMthlyDefAnnImmPV = () => {
        const numberRegex: RegExp = /^[0-9]+\.[0-9]+$/g
        if (!(numberRegex.test(String(i)) && numberRegex.test(String(n)) && numberRegex.test(String(m)) && numberRegex.test(String(q)))) {
            setMessage("either i, n, m or q is not a number")
            return
        }
        const mthlyDefAnnImmPV = mthlyDeferredAnnuityImmediatePV(i, m, n, q)
        const im = iMthly(i, m)
        setMthlyDefAnnImmPV(mthlyDefAnnImmPV)
        setQ(0)
        setI(0)
        setN(0)
        setM(0)
        setIM(im)
        setMessage(`The m-thly annuity immediate PV factor at rate ${i} pa, effective, convertible ${12/m} time(s) pa and period ${n}, deferred for ${q} long}`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculateMthlyDefAnnImmPV}>
                <FormGroup>
                    <Label for="mthlyDefImmediatePV">
                        Calculate the PV factor of an m-thly deferred annuity immediate
                    </Label>
                    <Label>
                        What is the interest rate (annual, effective)?
                    </Label>
                    <Input invalid type="text" placeholder="12.34" value={i} onChange={(e) => setI(Number(e.target.value))} />
                    <FormFeedback invalid>
                        Interest rate must be a number, dummy!
                    </FormFeedback>
                    <Label>
                        What is the period of time in question (years)?
                    </Label>
                    <Input invalid type="text" placeholder="12.34" value={n} onChange={(e) => setN(Number(e.target.value))} />
                    <FormFeedback invalid>
                        Period must be a number, dummy!
                    </FormFeedback>
                    <Label>
                        How many sub-periods are there in a year? (12 means  monthly)
                    </Label>
                    <Input invalid type="text" placeholder="12" value={m} onChange={(e) => setM(Number(e.target.value))} />
                    <FormFeedback invalid>
                        Sub-period must be a number, dummy!
                    </FormFeedback>
                    <Label>
                        How long will the annuity be deferred (years)?
                    </Label>
                    <Input invalid type="text" placeholder="12.34" value={q} onChange={(e) => setQ(Number(e.target.value))} />
                    <FormFeedback invalid>
                        Defer period must be a number, dummy!
                    </FormFeedback>
                    <Button type="submit" onClick={() => { setSubmitted(true) }}>Calculate</Button>
                </FormGroup>
            </Form>
            {submitted ? (
                <>
                    <Card color="primary" inverse style={{ width: '18rem' }}>
                        <CardHeader>Deferred m-thly Annuity Immediate</CardHeader>
                        <CardBody>
                            <CardTitle>Present Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                interest rate: {iM}% annual, convertible {12/m} times pa
                                period: {n} years
                                sub-periods: {m} pa
                                deferred for: {q} years
                                PVF: {mthlyDefAnnImmPV}
                            </CardText>
                        </CardBody>
                    </Card>
                    <p>{message}</p>
                </>
            ) : (
                <></>
            )}
        </Container>
    )
}

export default MthlyDeferredImmediatePV