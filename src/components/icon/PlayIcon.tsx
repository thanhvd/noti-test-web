import * as React from "react"
import { SVGProps } from "react"
const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 12 12" {...props}>
    <title>{"play [#1000]"}</title>
    <path
      fill="#000"
      fillRule="evenodd"
      d="m9.074 7.733-5.766 3.898C1.903 12.581 0 11.584 0 9.898V2.102C0 .416 1.903-.581 3.308.369l5.766 3.898a2.088 2.088 0 0 1 0 3.466"
    />
  </svg>
)
export default PlayIcon
