import { useState } from "react"
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { annuityImmediateFV } from "../formulas/0-compound_interest"
import React from "react"

const ImmediateFV = () => {
    const [i, setI] = useState(0)
    const [n, setN] = useState(0)
    const [annImmFV, setAnnImmFV] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [message, setMessage] = useState("")

    const calculateAnnImmFV = () => {
        const numberRegex: RegExp = /\d+(\.\d+)?/g
        if (!(numberRegex.test(String(i)) && numberRegex.test(String(n)))) {
            setMessage("either i or n is not a number")
            return
        }
        const annImmFV = annuityImmediateFV(i, n)
        setAnnImmFV(annImmFV)
        setI(0)
        setN(0)
        setMessage(`The annuity immediate FV factor at rate ${i} and period ${n}`)
        setSubmitted(false)
    }

    return (
        <Container>
            <Form onSubmit={calculateAnnImmFV}>
                <FormGroup>
                    <Label for="immediateFV">
                        Calculate the FV factor of an annuity immediate
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
                        <CardHeader>Annuity Immediate</CardHeader>
                        <CardBody>
                            <CardTitle>Future Value</CardTitle>
                            <CardText>
                                interest rate: {i} % annual, effective
                                period: {n} years
                                FVF: {annImmFV}
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

export default ImmediateFV