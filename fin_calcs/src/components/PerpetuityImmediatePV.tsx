import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { perpetuityImmediatePV } from "../formulas/0-compound_interest"
import React from "react"

const PerpetuityImmediatePV = () => {
    const [i, setI] = useState(0)
    const [perpImmPV, setPerpImmPV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculatePerpImmPV = () => {
        const numberRegex: RegExp = /\d+(\.\d+)?/g
        if (!(numberRegex.test(String(i)))) {
            setMessage("i is not a number")
            return
        }
        const perpImmPV = perpetuityImmediatePV(i)
        setPerpImmPV(perpImmPV)
        setI(0)
        setMessage(`The perpetuity immediate PV factor at rate ${i}`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculatePerpImmPV}>
                <FormGroup>
                    <Label for="perpetuityImmPV">
                        Calculate the PV factor of a perpetuity immediate
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
                        <CardHeader>Perpetuity Immediate</CardHeader>
                        <CardBody>
                            <CardTitle>Present Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                period: "forever"
                                PVF: {perpImmPV}
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

export default PerpetuityImmediatePV