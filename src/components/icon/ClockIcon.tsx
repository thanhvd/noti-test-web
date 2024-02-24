import * as React from "react"
import { SVGProps } from "react"
const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.062 12A8.001 8.001 0 0 1 21 13a8 8 0 0 1-8 8H8m5-8V9m-2-6h4M3 15h5m-3 3h5"
    />
  </svg>
)
export default ClockIcon
