import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { deferredAnnuityDuePV, d } from "../formulas/0-compound_interest"
import React from "react"

const DeferredDuePV = () => {
    const [i, setI] = useState(0)
    const [n, setN] = useState(0)
    const [m, setM] = useState(0)
    const [dd, setD] = useState(0)
    const [defAnnDuePV, setDefAnnDuePV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculateDefAnnDuePV = () => {
        const numberRegex: RegExp = /\d+(\.\d+)?/g
        if (!(numberRegex.test(String(i)) && numberRegex.test(String(n)) && numberRegex.test(String(m)))) {
            setMessage("either i, n or m is not a number")
            return
        }
        const defAnnDuePV = deferredAnnuityDuePV(i, n, m)
        const dD = d(i)
        setDefAnnDuePV(defAnnDuePV)
        setD(dD)
        setI(0)
        setN(0)
        setM(0)
        setMessage(`The annuity due PV factor at rate ${i} and period ${n}, deferred for ${m} long`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculateDefAnnDuePV}>
                <FormGroup>
                    <Label for="defDuePV">
                        Calculate the PV factor of a deferred annuity due
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
                        How long will the annuity be deferred (years)?
                    </Label>
                    <Input invalid type="text" placeholder="12.34" value={m} onChange={(e) => setM(Number(e.target.value))} />
                    <FormFeedback invalid>
                        Defer period must be a number, dummy!
                    </FormFeedback>
                    <Button type="submit" onClick={() => { setSubmitted(true) }}>Calculate</Button>
                </FormGroup>
            </Form>
            {submitted ? (
                <>
                    <Card color="primary" inverse style={{ width: '18rem' }}>
                        <CardHeader>Deferred Annuity Due</CardHeader>
                        <CardBody>
                            <CardTitle>Present Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                discount rate: {dd} % annual, effective
                                period: {n} years
                                deferred for: {m} years
                                PVF: {defAnnDuePV}
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

export default DeferredDuePV