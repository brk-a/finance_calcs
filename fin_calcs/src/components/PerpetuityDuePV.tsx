import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { perpetuityDuePV, d } from "../formulas/0-compound_interest"
import React from "react"

const PerpetuityDuePV = () => {
    const [i, setI] = useState(0)
    const [dd, setD] = useState(0)
    const [perpDuePV, setPerpDuePV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculatePerpDuePV = () => {
        const numberRegex: RegExp = /\d+(\.\d+)?/g
        if (!(numberRegex.test(String(i)))) {
            setMessage("i is not a number")
            return
        }
        const perpDuePV = perpetuityDuePV(i)
        const dD = d(i)
        setPerpDuePV(perpDuePV)
        setD(dD)
        setI(0)
        setMessage(`The perpetuity due PV factor at rate ${i}`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculatePerpDuePV}>
                <FormGroup>
                    <Label for="perpetuityDuePV">
                        Calculate the PV factor of a perpetuity due
                    </Label>
                    <Label>
                        What is the interest rate (annual, effective)?
                    </Label>
                    <Input invalid type="text" placeholder="12.34" value={i} onChange={(e) => setI(Number(e.target.value))} />
                    <FormFeedback invalid>
                        Interest rate must be a number, dummy!
                    </FormFeedback>
                    <Button type="submit" onClick={() => { setSubmitted(true) }}>Calculate</Button>
                </FormGroup>
            </Form>
            {submitted ? (
                <>
                    <Card color="primary" inverse style={{ width: '18rem' }}>
                        <CardHeader>Perpetuity Due</CardHeader>
                        <CardBody>
                            <CardTitle>Present Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                discount rate: {dd} % annual, effective
                                period: "forever"
                                PVF: {perpDuePV}
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

export default PerpetuityDuePV