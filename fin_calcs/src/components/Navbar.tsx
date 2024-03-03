import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from "reactstrap"
import links from "../assets/links/links"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import logo from "../assets/images/giraffe.jpg"

const Navbar = () => {
    const [dropDownOpen, setdropDownOpen] = useState(false)

    const toggle = () => setdropDownOpen(!dropDownOpen)

    return (
        <Container>
            <Container>
                <Image src={logo} alt="logo" width={200} height={200} />
            </Container>
            <Container>
                <Nav tabs>
                    {links.map(link => (
                        <div key={link.id}>
                            <Dropdown nav isOpen={dropDownOpen} toggle={toggle}>
                                <DropdownToggle nav caret>
                                    {link.category}
                                </DropdownToggle>
                                {link.items.map(item => (
                                    <div key={item.id}>
                                        <DropdownMenu>
                                            <DropdownItem header>
                                                {<Link href={item.location}>
                                                    {item.resource}
                                                </Link>}
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </div>
                                ))}
                            </Dropdown>
                        </div>
                    ))}
                </Nav>
            </Container>
        </Container>
    )
}

export default Navbar