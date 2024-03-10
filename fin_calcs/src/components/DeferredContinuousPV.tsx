import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { deferredContinuousAnnuityPV, forceOfInterest } from "../formulas/0-compound_interest"
import React from "react"

const DeferredContinuousPV = () => {
    const [i, setI] = useState(0)
    const [n, setN] = useState(0)
    const [q, setQ] = useState(0)
    const [force, setForce] = useState(0)
    const [defContAnnPV, setDefContAnnPV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculateDefContAnnPV = () => {
        const numberRegex: RegExp = /\d+(\.\d+)?/g
        if (!(numberRegex.test(String(i)) && numberRegex.test(String(n)) && numberRegex.test(String(q)))) {
            setMessage("either i, n or q is not a number")
            return
        }
        const defContAnnPV = deferredContinuousAnnuityPV(i, n, q)
        const f = forceOfInterest(i)
        setDefContAnnPV(defContAnnPV)
        setForce(f)
        setI(0)
        setN(0)
        setQ(0)
        setMessage(`The continuous annuity PV factor at rate ${i} and period ${n} deferred for ${q} long`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculateDefContAnnPV}>
                <FormGroup>
                    <Label for="defContinuousPV">
                        Calculate the PV factor of a deferred continuous annuity
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
                        <CardHeader>Deferred Continuous Annuity</CardHeader>
                        <CardBody>
                            <CardTitle>Present Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                force of interest: {force}
                                period: {n} years
                                deferred for: {q} years
                                PVF: {defContAnnPV}
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

export default DeferredContinuousPV