export function getMyComponentCSS() {
    return `
                .simple-card {
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    max-width: 300px;
                    margin: 5%
                }

                .simple-card img {
                    width: 100%;
                    height: auto;
                    display: block;
                }
                
                .simple-card p, h2 {
                    text-align: center;
                }
                `;
}