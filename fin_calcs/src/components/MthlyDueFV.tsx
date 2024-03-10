import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { mthlyAnnuityDueFV, dMthly, d } from "../formulas/0-compound_interest"
import React from "react"

const MthlyDueFV = () => {
    const [i, setI] = useState(0)
    const [n, setN] = useState(0)
    const [m, setM] = useState(0)
    const [dd, setD] = useState(0)
    const [dM, setDM] = useState(0)
    const [mthlyAnnDueFV, setMthlyAnnDueFV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculateMthlyAnnDueFV = () => {
        const numberRegex: RegExp = /\d+(\.\d+)?/g
        if (!(numberRegex.test(String(i)) && numberRegex.test(String(n)) && numberRegex.test(String(m)))) {
            setMessage("either i, n or m is not a number")
            return
        }
        const mthlyAnnDuefV = mthlyAnnuityDueFV(i, m, n)
        const dD = d(i)
        const dM = dMthly(i, m)
        setMthlyAnnDueFV(mthlyAnnDueFV)
        setI(0)
        setN(0)
        setM(0)
        setD(dD)
        setDM(dM)
        setMessage(`The m-thly annuity due FV factor at rate ${i} pa, effective, convertible ${12/m} time(s) pa and period ${n}`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculateMthlyAnnDueFV}>
                <FormGroup>
                    <Label for="mthlydueFV">
                        Calculate the FV factor of an m-thly annuity due
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
                    <Button type="submit" onClick={() => { setSubmitted(true) }}>Calculate</Button>
                </FormGroup>
            </Form>
            {submitted ? (
                <>
                    <Card color="primary" inverse style={{ width: '18rem' }}>
                        <CardHeader>m-thly Annuity Due</CardHeader>
                        <CardBody>
                            <CardTitle>Future Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                discount rate: {dd}% annual, effective
                                discount rate: {dM}% annual, convertible {12/m} times pa
                                period: {n} years
                                sub-periods: {m} pa
                                FVF: {mthlyAnnDueFV}
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

export default MthlyDueFV