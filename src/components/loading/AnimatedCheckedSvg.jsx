const AnimatedCheckedSvg = () => (
  <div className="f-center">
    <svg viewBox="0 0 24 24" width="78" height="78">
      <defs>
        <clipPath id="fillClip">
          <rect x="0" y="24" width="0" height="0">
            <animate attributeName="width" from="0" to="24" dur="1s" begin="0s" fill="freeze" />
            <animate attributeName="y" from="24" to="0" dur="1s" begin="0s" fill="freeze" />
            <animate attributeName="height" from="0" to="24" dur="1s" begin="0s" fill="freeze" />
          </rect>
        </clipPath>
      </defs>

      <path
        d="M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10zm-2.21 5.04c.13.57.21 1.17.21 1.78
           0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44
           C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10
           c0-1.19-.22-2.33-.6-3.39z"
        fill="none"
        stroke="#6A39C0"
        strokeWidth="0.1"
        strokeDasharray="150"
        strokeDashoffset="150"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="150"
          to="0"
          dur="1s"
          begin="0s"
          fill="freeze"
        />
      </path>

      <path
        d="M22 5.18 10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10zm-2.21 5.04c.13.57.21 1.17.21 1.78
           0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8c1.58 0 3.04.46 4.28 1.25l1.44-1.44
           C16.1 2.67 14.13 2 12 2 6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10
           c0-1.19-.22-2.33-.6-3.39z"
        fill="#6A39C0"
        clipPath="url(#fillClip)"
        stroke="none"
      />
    </svg>
  </div>
);

export default AnimatedCheckedSvg;
