describe('Klig parser', () => {
    let parser;

    beforeEach(() => {
        parser = {parse: jest.fn(() => undefined)};
    });

    describe('should be able to parse empty layout', () => {
        it('without any characters', () => {
            const layout = '';
            const ast = [[]];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with spaces in one line', () => {
            const layout = '  \t ';
            const ast = [[]];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with many empty lines', () => {
            const layout = '\n\r\n\n';
            const ast = [[], []];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('with many lines with spaces', () => {
            const layout = '\n  \r\n\t';
            const ast = [[], [], []];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });
    });

    describe('should be able to parse one line', () => {
        describe('with one special key', () => {
            it('without spaces', () => {
                const layout = 'SHIFT';
                const ast = [['SHIFT']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces', () => {
                const layout = '  ALT\t ';
                const ast = [['META']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with new line', () => {
                const layout = 'ALTGR\r\n';
                const ast = [['ALTGR']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces and new line', () => {
                const layout = ' ALTGR\t\r\n';
                const ast = [['ALTGR']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });
        });

        describe('with many special key', () => {
            it('with spaces', () => {
                const layout = 'OPTION  ALT\t ';
                const ast = [['META', 'META']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with new line', () => {
                const layout = ' ALT ALTGR\r\n';
                const ast = [['META', 'ALTGR']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces and new line', () => {
                const layout = '  ALTGR CTRL\t\r\n';
                const ast = [['ALTGR', 'CONTROL']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });
        });

        describe('with one dead key', () => {
            it('without spaces', () => {
                const layout = '["]';
                const ast = [['dead:"']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces', () => {
                const layout = '  [¸]\t ';
                const ast = [['dead:¸']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with new line', () => {
                const layout = '[^]\r\n';
                const ast = [['dead:^']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces and new line', () => {
                const layout = ' [°]\t\r\n';
                const ast = [['dead:°']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });
        });

        describe('with many dead keys', () => {
            it('with spaces', () => {
                const layout = '["]  [^]\t ';
                const ast = [['dead:"', 'dead:^']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with new line', () => {
                const layout = ' [°] [¸]\r\n';
                const ast = [['dead:°', 'dead:¸']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });

            it('with spaces and new line', () => {
                const layout = '  [^] [¸]\t\r\n';
                const ast = [['dead:^', 'dead:¸']];

                let result = parser.parse(layout);

                expect(result).toEqual(ast);
            });
        });
    });

    describe('should be able to parse', () => {
        it('uppercase letter', () => {
            const layout = 'A';
            const ast = [['A']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('lowercase letter', () => {
            const layout = 'd';
            const ast = [['d']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('digit', () => {
            const layout = '4';
            const ast = [['4']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('other characters', () => {
            const layout = '{';
            const ast = [['{']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });
    });

    describe('should be able to parse special keys', () => {
        it('written with uppercase', () => {
            const layout = 'SHIFT';
            const ast = [['SHIFT']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('written with lowercase', () => {
            const layout = 'option';
            const ast = [['META']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('written with title case', () => {
            const layout = 'Alt';
            const ast = [['META']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });

        it('written with camelcase', () => {
            const layout = 'oPtiOn';
            const ast = [['META']];

            let result = parser.parse(layout);

            expect(result).toEqual(ast);
        });
    });
});
