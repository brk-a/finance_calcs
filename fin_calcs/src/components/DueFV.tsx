import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { annuityDueFV, d } from "../formulas/0-compound_interest"
import React from "react"

const DueFV = () => {
    const [i, setI] = useState(0)
    const [n, setN] = useState(0)
    const [dd, setD] = useState(0)
    const [annDueFV, setAnnDueFV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculateAnnDueFV = () => {
        const numberRegex: RegExp = /\d+(\.\d+)?/g
        if (!(numberRegex.test(String(i)) && numberRegex.test(String(n)))) {
            setMessage("either i or n is not a number")
            return
        }
        const annDueFV = annuityDueFV(i, n)
        const dD = d(i)
        setAnnDueFV(annDueFV)
        setI(0)
        setN(0)
        setD(dD)
        setMessage(`The annuity due FV factor at rate ${i} and period ${n}`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculateAnnDueFV}>
                <FormGroup>
                    <Label for="dueFV">
                        Calculate the FV factor of an annuity due
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
                        <CardHeader>Annuity Due</CardHeader>
                        <CardBody>
                            <CardTitle>Future Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                discount rate: {dd}%, effective
                                period: {n} years
                                FVF: {annDueFV}
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

export default DueFV