import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { continuousAnnuityPV, forceOfInterest } from "../formulas/0-compound_interest"
import React from "react"

const ContinuousPV = () => {
    const [i, setI] = useState(0)
    const [n, setN] = useState(0)
    const [force, setForce] = useState(0)
    const [contAnnPV, setContAnnPV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculateContAnnPV = () => {
        const numberRegex: RegExp = /^[0-9]+\.[0-9]+$/g
        if (!(numberRegex.test(String(i)) && numberRegex.test(String(n)))) {
            setMessage("either i or n is not a number")
            return
        }
        const contAnnPV = continuousAnnuityPV(i, n)
        const f = forceOfInterest(i)
        setContAnnPV(contAnnPV)
        setForce(f)
        setI(0)
        setN(0)
        setMessage(`The continuous annuity PV factor at rate ${i} and period ${n}`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculateContAnnPV}>
                <FormGroup>
                    <Label for="continuousPV">
                        Calculate the PV factor of a continuous annuity
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
                    <Button type="submit" onClick={() => { setSubmitted(true) }}>Calculate</Button>
                </FormGroup>
            </Form>
            {submitted ? (
                <>
                    <Card color="primary" inverse style={{ width: '18rem' }}>
                        <CardHeader>Continuous Annuity</CardHeader>
                        <CardBody>
                            <CardTitle>Present Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                force of interest: {force}
                                period: {n} years
                                PVF: {contAnnPV}
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

export default ContinuousPV