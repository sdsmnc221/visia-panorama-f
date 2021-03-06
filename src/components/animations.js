import anime from 'animejs';
import ReactDOM from 'react-dom';
import theme from './theme';

export const animateLetters1 = (letters) => {
    class Letter {
        constructor(letter, position) {
            this.DOM = {};
            this.DOM.letter = letter;
            this.position = position;
            this.config = {
                easing: [0.2,1,0.3,1],
                animations: [
                    {
                        origin: '0% 100%',
                        opts: {
                            rotate: [
                                {
									value: () => {
										this.anim1angle = anime.random(-20,-55);
										this.anim1fall = this.anim1angle < -45 ? true : false;
										return this.anim1angle;
									}, 
									duration: () => {
										return this.anim1fall ? 1000 : 1;
									}, 
									easing: [0.4,0,0.8,0]
                                },
                                {
                                    value: 0, 
									duration: 600, 
									delay: () => {
										return this.anim1fall ? 1000 : 0;
									},
									easing: [0.4,0,0.8,0]
                                }
                            ]
                        }
                    },
                    {
						origin: '50% 100%',
						opts: {
							easing: 'easeOutExpo',
							scaleY: [
								{value: 0.3, duration: 250},
								{value: 1, duration: 250}
							],
							scaleX: [
								{value: 2, duration: 250},
								{value: 0.6, duration: 250},
								{value: 1, duration: 250, easing: 'easeInQuad'}
							],
							translateY: [
								{value: function() { return anime.random(-200,-100); }, duration: 250, delay: 250, easing: 'easeOutExpo'},
								{value: 0, duration: 250, easing: 'easeInQuad'}
							]
						}
                    },
                    {
						perspective: 1000,
						perspectiveOrigin: '500% 50%',
						origin: '50% 100%',
						opts: {
							rotateX: [
								{value: [0,-180], duration: 1600, easing: 'easeOutElastic', elasticity: 700},
								{value: -360, duration: 400, easing: 'easeInQuad'}
							]
						}
                    },
                    {
						origin: () => { 
							const r = anime.random(0,2);
							if ( r === 0 ) {
								return '50% 100%';
							}
							else if ( r === 1 ) {
								return '50% 0%';
							}
							return '50% 50%'; 
						},
						opts: {
							scaleY: [
								{value: 3, duration: 400, easing: [0.3,1,0.3,1]},
								{value: 1, duration: 800, easing: 'easeOutElastic', elasticity: 500}
							],
							scaleX: [
								{value: 0.5, duration: 400, easing: [0.3,1,0.3,1]},
								{value: 1, duration: 800, easing: 'easeOutElastic', elasticity: 500}
							]
						}
                    },
                    {
						perspective: 1000,
						perspectiveOrigin: '50% -300%',
						opts: {
							rotateY: [
								{value: [0,-180], duration: 800, easing: [0.1,1,0.3,1]},
								{value: -360, duration: 1000, easing: 'easeOutElastic', elasticity: 300}
							]
						}
                    },
                    {
						origin: '50% 0%',
						opts: {
							duration: 300,
							easing: [0.4,0,0.8,0],
							translateY: [
								{
									value: function(t) {
										const bcr = t.getBoundingClientRect();
										return -1*bcr.top+5 + 'px';
									}
								},
								{value: 0, duration: 200, delay: 750, easing: [0.2,1,0.3,1]}
							],
							scaleX: [
								{value: 0.8, duration: 600, delay: 300, easing: [0.4,0,0.8,0]},
								{value: 1, duration: 200, easing: 'easeOutExpo'},
							],
							scaleY: [
								{value: 3, duration: 600, delay: 300, easing: [0.4,0,0.8,0]},
								{value: 1, duration: 200, easing: 'easeOutExpo'},
							]
						}
                    },
                    {
						origin: '50% 100%',
						opts: {
							duration: 500,
							easing: 'easeOutExpo',
							scaleY: [
								{value: 0.3},
								{value: 1, duration: 800, easing: 'easeOutElastic'}
							],
							scaleX: [
								{value: 1.5},
								{value: 1, duration: 800, easing: 'easeOutElastic'}
							]
						}
					}
                ]
            };
            this.animationStyle = position % this.config.animations.length;
            this.createShadowLetter();
            this.styleShadowLetter();
            this.initAnimations();
        }

        createShadowLetter() {
            this.DOM.letterInner = document.createElement('span');
			this.DOM.letterInner.innerHTML = this.DOM.letter.innerHTML;
			this.DOM.letter.innerHTML = '';
            this.DOM.letter.appendChild(this.DOM.letterInner);
        }

        styleShadowLetter() {
            const scale = 1 + anime.random(0, 5)/100;
            this.DOM.letter.style.zIndex = this.position;
            // this.DOM.letter.style.top = `${anime.random(-5*(this.position+1), 5*(this.position+1)*(scale*2))}px`;
            // this.DOM.letter.style.left = `${anime.random(5*(this.position+1), 10*(this.position+1)*(scale*2))}px`;
            this.DOM.letter.style.transform = `rotate(${anime.random(-1*(this.position+1), 2*(this.position+1))}deg) scale(${scale}) translate(${(this.position+1)*17}%, ${anime.random((this.position+1)*5, (this.position+1)*10)}%)`;
        }

        initAnimations() {
            this.Fn = () => {
                if( this.isActive ) return;
                this.isActive = true;
                const animation = this.config.animations[this.animationStyle];
                this.DOM.letter.style.perspective = animation.perspective ? `${animation.perspective}px` : 'none';
                this.DOM.letter.style.perspectiveOrigin = animation.perspectiveOrigin ? animation.perspectiveOrigin : '50% 50%';
                this.DOM.letterInner.style.transformOrigin = animation.origin ? (typeof animation.origin === 'function' ? animation.origin() : animation.origin) : '50% 50%';

                anime.remove(this.DOM.letterInner);
                let animOpts = {
                    targets: this.DOM.letterInner, 
                    complete: () => this.isActive = false
                };
                anime(Object.assign(animOpts, animation.opts));
            };

            this.DOM.letter.addEventListener('mouseover', this.Fn);
            this.DOM.letter.addEventListener('touchstart', this.Fn);
        }
    }

    letters.forEach((letter, position) => new Letter(letter, position));
};