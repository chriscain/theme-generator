/* @flow */

import React from 'react';
import styles from './content.module.css';

import type {Font} from '../App';

type Props = {
    backgroundColor: string,
    textColor: string,
    fontSize: number,
    lineHeight: number,
    horizontalMargin: number,
    verticalMargin: number,
    fontBody: Font,
    fontHeader: Font,
};

export class Content extends React.Component<Props> {
    componentWillReceiveProps(nextProps: Props) {
        if (
            nextProps.fontBody &&
            this.props.fontBody &&
            nextProps.fontHeader &&
            this.props.fontHeader &&
            (nextProps.fontBody.family !== this.props.fontBody.family ||
                nextProps.fontHeader.family !== this.props.fontHeader.family)
        ) {
            const combinedFont = document.head.querySelector('#combined-font');
            const googleUrl = 'https://fonts.google.com/specimen/';
            const headingFontUrl =
                googleUrl + nextProps.fontBody.family.replace(/ /g, '+');
            const bodyFontUrl =
                googleUrl + nextProps.fontBody.family.replace(/ /g, '+');
            if (combinedFont == null) {
                const link = document.createElement('link');
                link.id = 'combined-font';
                link.href = `https://fonts.googleapis.com/css?family=${nextProps.fontHeader.family.replace(
                    / /g,
                    '+'
                )}|${nextProps.fontBody.family.replace(/ /g, '+')}`;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            } else {
                combinedFont.href = `https://fonts.googleapis.com/css?family=${nextProps.fontHeader.family.replace(
                    / /g,
                    '+'
                )}|${nextProps.fontBody.family.replace(/ /g, '+')}`;
            }
        }
    }
    render() {
        const containerStyles = {
            backgroundColor: `#${this.props.backgroundColor}`,
        };

        const contentContainerStyles = {
            margin: `${this.props.verticalMargin}px ${
                this.props.horizontalMargin
            }px`,
        };

        const textStyles = {
            color: `#${this.props.textColor}`,
            fontSize: `${this.props.fontSize}px`,
            lineHeight: `${this.props.lineHeight}px`,
            fontFamily: this.props.fontBody.family,
        };

        const h1Styles = {
            ...textStyles,
            fontSize: `${this.props.fontSize + 7}px`,
            lineHeight: `${this.props.lineHeight + 9}px`,
            fontWeight: 'bold',
            fontFamily: this.props.fontHeader.family,
        };

        const h2Styles = {
            ...textStyles,
            fontSize: `${this.props.fontSize + 3}px`,
            lineHeight: `${this.props.lineHeight + 5}px`,
            fontFamily: this.props.fontHeader.family,
        };

        return (
            <div
                className={styles['content-container']}
                style={containerStyles}
            >
                <div className={styles.content} style={contentContainerStyles}>
                    <h1 style={h1Styles}>
                        6 Science-Backed Strategies to Avoid Choking Under
                        Pressure
                    </h1>
                    <h2 style={h2Styles}>
                        Failing spectacularly in a high-stakes situation is a
                        near-universal experience. Fortunately, there’s plenty
                        of research on how to keep a cool head.
                    </h2>
                    <p style={textStyles}>
                        Even now, 10 years later, I still remember the moment
                        with excruciating clarity: During the fourth and final
                        round of a high school regional speech competition,
                        after a full day of flawless performances, I went up to
                        the front of the auditorium for my last speech and
                        froze.
                    </p>
                    <p style={textStyles}>
                        {' '}
                        In a way, my entire senior had been leading up to that
                        point. For six months, I had painstakingly prepared and
                        rehearsed that piece — a prose reading — in the hopes
                        that I would qualify for the state finals. I had placed
                        in the top three in my event at every competition that
                        season; if I did the same at regionals, I had my ticket
                        to the next round.
                    </p>
                    <p style={textStyles}>
                        {' '}
                        Needless to say, I blew it. Although I had fully
                        committed the piece to memory at that point, I couldn’t,
                        for the life of me, recall a single word. Like an
                        amateur, I kept stuttering, stumbling, and looking down
                        at my book. It was a brutal end to an otherwise stellar
                        season.
                    </p>
                    <p style={textStyles}>
                        {' '}
                        As humiliating as the experience was, I took some small
                        amount of comfort (and still do) in knowing that some
                        version of this happens to everyone. Choking under
                        pressure is a widely studied phenomenon, one that
                        afflicts speakers, athletes, performers,
                        test-takers — really, anyone who’s in a high-pressure
                        situation.
                    </p>{' '}
                    <p style={textStyles}>
                        The process is physical as much as it is mental. Anxiety
                        causes the body to release adrenaline, which acts as a
                        powerful stimulant, and endorphins, which act as a mild
                        opiate. “When you’re anxious, you’re also basically a
                        little high and a little stoned,” says Aimee Daramus, a
                        licensed clinical psychologist based in Chicago.
                        High-stakes situations can also cause neurological
                        reactions like distraction, memory loss, and loss of
                        motor function, all of which can impact performance.
                    </p>{' '}
                    <p style={textStyles}>
                        Fortunately, for every reason people choke under
                        pressure, there’s also a rigorously studied, scientific
                        strategy for combatting it. Here are six of them.{' '}
                    </p>
                    <h3 style={{...textStyles, fontWeight: 'bold'}}>
                        Don’t think too hard.
                    </h3>
                    <p style={textStyles}>
                        {' '}
                        When you’re trying to do your best, you can also fall
                        into the trap of trying to control things that are
                        better left to your subconscious mind. In a 2017 TED
                        Talk, cognitive scientist Sian Beilock, who studies
                        performance anxiety, called this phenomenon “paralysis
                        by analysis” — the idea that trying to analyze or
                        control your performance, instead of just letting it
                        happen, can trip you up in something that would
                        otherwise feel natural.
                    </p>
                    <p style={textStyles}>
                        {' '}
                        Needless to say, I blew it. Although I had fully
                        committed the piece to memory at that point, I couldn’t,
                        for the life of me, recall a single word. Like an
                        amateur, I kept stuttering, stumbling, and looking down
                        at my book. It was a brutal end to an otherwise stellar
                        season.
                    </p>
                    <p style={textStyles}>
                        {' '}
                        As humiliating as the experience was, I took some small
                        amount of comfort (and still do) in knowing that some
                        version of this happens to everyone. Choking under
                        pressure is a widely studied phenomenon, one that
                        afflicts speakers, athletes, performers,
                        test-takers — really, anyone who’s in a high-pressure
                        situation.
                    </p>{' '}
                    <p style={textStyles}>
                        The process is physical as much as it is mental. Anxiety
                        causes the body to release adrenaline, which acts as a
                        powerful stimulant, and endorphins, which act as a mild
                        opiate. “When you’re anxious, you’re also basically a
                        little high and a little stoned,” says Aimee Daramus, a
                        licensed clinical psychologist based in Chicago.
                        High-stakes situations can also cause neurological
                        reactions like distraction, memory loss, and loss of
                        motor function, all of which can impact performance.
                    </p>
                    <p style={textStyles}>
                        {' '}
                        Needless to say, I blew it. Although I had fully
                        committed the piece to memory at that point, I couldn’t,
                        for the life of me, recall a single word. Like an
                        amateur, I kept stuttering, stumbling, and looking down
                        at my book. It was a brutal end to an otherwise stellar
                        season.
                    </p>
                    <p style={textStyles}>
                        {' '}
                        As humiliating as the experience was, I took some small
                        amount of comfort (and still do) in knowing that some
                        version of this happens to everyone. Choking under
                        pressure is a widely studied phenomenon, one that
                        afflicts speakers, athletes, performers,
                        test-takers — really, anyone who’s in a high-pressure
                        situation.
                    </p>{' '}
                    <p style={textStyles}>
                        The process is physical as much as it is mental. Anxiety
                        causes the body to release adrenaline, which acts as a
                        powerful stimulant, and endorphins, which act as a mild
                        opiate. “When you’re anxious, you’re also basically a
                        little high and a little stoned,” says Aimee Daramus, a
                        licensed clinical psychologist based in Chicago.
                        High-stakes situations can also cause neurological
                        reactions like distraction, memory loss, and loss of
                        motor function, all of which can impact performance.
                    </p>
                </div>
            </div>
        );
    }
}
