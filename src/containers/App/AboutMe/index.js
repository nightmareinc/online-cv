import React, { Component } from 'react';
import AboutMeWrapper, * as AboutMeStyled from '../../../components/App/AboutMe';

class AboutMe extends Component {
    render() {
        return (
            <AboutMeWrapper>
                <AboutMeStyled.Body>
                    I've always had a hard time describing myself to others until 
                    I came across a quote from Bruce Lee, and it goes like this:
                </AboutMeStyled.Body>
                <AboutMeStyled.Quote>
                    You must be shapeless, formless, like water. When you pour 
                    water in a cup, it becomes the cup. When you pour water in 
                    a bottle, it becomes the bottle. When you pour water in a teapot
                    , it becomes the teapot. Water can drip and it can crash.
                     Become like water my friend.
                </AboutMeStyled.Quote>
                <AboutMeStyled.Body>
                    and it was the closest to what I've always been trying to say.<br />
                    what I want to take from that quote is that in nature, I'm a lot
                    like water, meaning I lack solidity and it makes me so flexible 
                    and there are only a few situations in which you might hear me say something like 
                    "I can't do that/ I can't be that" and those are where I draw the line.
                    <br />I don't have sharp boundaries but I have firm 
                    columns upon which I grow.<br />
                    just like water could give power to a steam engine or cut through
                    hardest materials or just hover above like a dolphin shaped cloud to make 
                    a child smile I can be so many things, and I don't know even a half of it.
                    this does not necessarily mean that I know exactly what environment I can
                    thrive in or what I want to be exactly, but I have a good idea of what environments will bring the worst out of me, 
                    here's the list:
                    <ul>
                        <li>
                            being judged by people that I consider my friends (note: I have a constant 
                            improvement kinda personality and I am ok with knowing what my shortcomings are
                            but not through judgment but through analysis.)
                        </li>
                        <li>
                            doing something repetitive or new but without a chance to grow and gain 
                            from it.
                        </li>
                        <li>
                            making a product for just money, not user and how it 
                            makes the user feel. because c'mon we're just a set 
                            of feelings. so feelings matter.
                        </li>
                        <li>
                            when people around me are not their true selves. I know 
                            this one is maybe "Too much to ask" but to use a person's
                            true potential you need their true selves not the masks on 
                            their faces.
                        </li>
                    </ul>
                    there is a lot that I don't even know that I don't know, and I'm living to find out :)<br/>
                    so what you just read was what I know about myself so far, I may find out tomorrow that most 
                    of them are wrong, and I'll gladly do my best to make myself better. <br />
                    thank you for reading this till the end and if you have anything to say 
                    about what you just read, please feel free to contact me (email is in the CV).
                </AboutMeStyled.Body>
            </AboutMeWrapper>
        )
    }
}

export default AboutMe;