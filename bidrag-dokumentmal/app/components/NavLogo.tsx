import {
  useNotatFelles,
  RenderPDFVersion,
} from "~/components/notat_felles/NotatContext";

export default function NavLogo() {
  const { renderPDFVersion } = useNotatFelles();

  if (renderPDFVersion == RenderPDFVersion.V1) {
    return (
      <img
        style={{ position: "relative" }}
        alt="NAV logo"
        className="navlogo2"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjY5cHgiIGhlaWdodD0iMTY5cHgiIHZpZXdCb3g9IjAgMCAyNjkgMTY5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MiAoMzY3ODEpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPk5BViBsb2dvIC8gcsO4ZDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxwb2x5Z29uIGlkPSJwYXRoLTEiIHBvaW50cz0iMjIuNDA3IDQzLjQxNjggMjIuNDA3IDAuNjg3OCAwLjU2MzUgMC42ODc4IDAuNTYzNSA0My40MTY4IDIyLjQwNyA0My40MTY4Ij48L3BvbHlnb24+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iTW9kdWwtZm9yc2xhZyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik5BVi1sb2dvLS8tcsO4ZCI+CiAgICAgICAgICAgIDxnIGlkPSJQYWdlLTEtQ29weSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTI1LjMwOTEsMTY4Ljk0MiBDNzguNjY4MSwxNjguOTQyIDQwLjg0OTEsMTMxLjEyNSA0MC44NDkxLDg0LjQ3NyBDNDAuODQ5MSwzNy44MjQgNzguNjY4MSwwIDEyNS4zMDkxLDAgQzE3MS45NjcxLDAgMjA5Ljc5MDEsMzcuODI0IDIwOS43OTAxLDg0LjQ3NyBDMjA5Ljc5MDEsMTMxLjEyNSAxNzEuOTY3MSwxNjguOTQyIDEyNS4zMDkxLDE2OC45NDIgWiIgaWQ9IkZpbGwtMSIgZmlsbD0iI0MzMDAwMCI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkZpbGwtMyIgZmlsbD0iI0MzMDAwMCIgcG9pbnRzPSIwIDEyMS4zNTg4IDE3LjI2NSA3OC42Mjk4IDMzLjg1NCA3OC42Mjk4IDE2LjYxMSAxMjEuMzU4OCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IkZpbGwtNSIgZmlsbD0iI0MzMDAwMCIgcG9pbnRzPSIyMTMuMDQ0IDEyMS4zNTg4IDIzMC4wODggNzguNjI5OCAyMzkuMTMyIDc4LjYyOTggMjIyLjA4OSAxMjEuMzU4OCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0Ni4wMDAwMDAsIDc3Ljk0MjAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8L21hc2s+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkNsaXAtOCI+PC9nPgogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJGaWxsLTciIGZpbGw9IiNDMzAwMDAiIG1hc2s9InVybCgjbWFzay0yKSIgcG9pbnRzPSIwLjU2MzUgNDMuNDE2OCAxNy42MDQ1IDAuNjg3OCAyMi40MDc1IDAuNjg3OCA1LjM2NDUgNDMuNDE2OCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5Ny4zNjA0LDc4LjYyOTggTDE4Mi4zNDQ0LDc4LjYyOTggQzE4Mi4zNDQ0LDc4LjYyOTggMTgxLjMwOTQsNzguNjI5OCAxODAuOTQzNCw3OS41NDM4IEwxNzIuNjMzNCwxMDQuOTgyOCBMMTY0LjMzMDQsNzkuNTQzOCBDMTYzLjk2NDQsNzguNjI5OCAxNjIuOTIzNCw3OC42Mjk4IDE2Mi45MjM0LDc4LjYyOTggTDEzNC4wNTE0LDc4LjYyOTggQzEzMy40MjY0LDc4LjYyOTggMTMyLjkwMjQsNzkuMTUxOCAxMzIuOTAyNCw3OS43NzI4IEwxMzIuOTAyNCw4OC40MTE4IEMxMzIuOTAyNCw4MS41NTg4IDEyNS42MTA0LDc4LjYyOTggMTIxLjM0MDQsNzguNjI5OCBDMTExLjc3ODQsNzguNjI5OCAxMDUuMzc3NCw4NC45Mjc4IDEwMy4zODQ0LDk0LjUwMjggQzEwMy4yNzY0LDg4LjE1MDggMTAyLjc0ODQsODUuODc0OCAxMDEuMDM3NCw4My41NDM4IEMxMDAuMjUxNCw4Mi40MDE4IDk5LjExNTQsODEuNDQxOCA5Ny44Nzg0LDgwLjY0NzggQzk1LjMzMTQsNzkuMTU1OCA5My4wNDQ0LDc4LjYyOTggODguMTI5NCw3OC42Mjk4IEw4Mi4zNTg0LDc4LjYyOTggQzgyLjM1ODQsNzguNjI5OCA4MS4zMTU0LDc4LjYyOTggODAuOTQ3NCw3OS41NDM4IEw3NS42OTY0LDkyLjU1NjggTDc1LjY5NjQsNzkuNzcyOCBDNzUuNjk2NCw3OS4xNTE4IDc1LjE3NjQsNzguNjI5OCA3NC41NTI0LDc4LjYyOTggTDYxLjE5ODQsNzguNjI5OCBDNjEuMTk4NCw3OC42Mjk4IDYwLjE2NzQsNzguNjI5OCA1OS43OTI0LDc5LjU0MzggTDU0LjMzMzQsOTMuMDc0OCBDNTQuMzMzNCw5My4wNzQ4IDUzLjc4ODQsOTQuNDI3OCA1NS4wMzQ0LDk0LjQyNzggTDYwLjE2NzQsOTQuNDI3OCBMNjAuMTY3NCwxMjAuMjExOCBDNjAuMTY3NCwxMjAuODUxOCA2MC42NzE0LDEyMS4zNTg4IDYxLjMxNDQsMTIxLjM1ODggTDc0LjU1MjQsMTIxLjM1ODggQzc1LjE3NjQsMTIxLjM1ODggNzUuNjk2NCwxMjAuODUxOCA3NS42OTY0LDEyMC4yMTE4IEw3NS42OTY0LDk0LjQyNzggTDgwLjg1NjQsOTQuNDI3OCBDODMuODE3NCw5NC40Mjc4IDg0LjQ0NDQsOTQuNTA4OCA4NS41OTY0LDk1LjA0NTggQzg2LjI5MDQsOTUuMzA3OCA4Ni45MTU0LDk1LjgzNzggODcuMjU2NCw5Ni40NDg4IEM4Ny45NTQ0LDk3Ljc2MjggODguMTI5NCw5OS4zNDA4IDg4LjEyOTQsMTAzLjk5MzggTDg4LjEyOTQsMTIwLjIxMTggQzg4LjEyOTQsMTIwLjg1MTggODguNjQzNCwxMjEuMzU4OCA4OS4yNzg0LDEyMS4zNTg4IEwxMDEuOTY2NCwxMjEuMzU4OCBDMTAxLjk2NjQsMTIxLjM1ODggMTAzLjQwMDQsMTIxLjM1ODggMTAzLjk2NzQsMTE5Ljk0MjggTDEwNi43Nzk0LDExMi45OTI4IEMxMTAuNTE4NCwxMTguMjI5OCAxMTYuNjcyNCwxMjEuMzU4OCAxMjQuMzIwNCwxMjEuMzU4OCBMMTI1Ljk5MTQsMTIxLjM1ODggQzEyNS45OTE0LDEyMS4zNTg4IDEyNy40MzQ0LDEyMS4zNTg4IDEyOC4wMDU0LDExOS45NDI4IEwxMzIuOTAyNCwxMDcuODE0OCBMMTMyLjkwMjQsMTIwLjIxMTggQzEzMi45MDI0LDEyMC44NTE4IDEzMy40MjY0LDEyMS4zNTg4IDEzNC4wNTE0LDEyMS4zNTg4IEwxNDcuMDAzNCwxMjEuMzU4OCBDMTQ3LjAwMzQsMTIxLjM1ODggMTQ4LjQzMjQsMTIxLjM1ODggMTQ5LjAwNjQsMTE5Ljk0MjggQzE0OS4wMDY0LDExOS45NDI4IDE1NC4xODY0LDEwNy4wODE4IDE1NC4yMDY0LDEwNi45ODQ4IEwxNTQuMjE0NCwxMDYuOTg0OCBDMTU0LjQxMzQsMTA1LjkxNDggMTUzLjA2MTQsMTA1LjkxNDggMTUzLjA2MTQsMTA1LjkxNDggTDE0OC40Mzg0LDEwNS45MTQ4IEwxNDguNDM4NCw4My44NDY4IEwxNjIuOTgzNCwxMTkuOTQyOCBDMTYzLjU1MTQsMTIxLjM1ODggMTY0Ljk4MzQsMTIxLjM1ODggMTY0Ljk4MzQsMTIxLjM1ODggTDE4MC4yODQ0LDEyMS4zNTg4IEMxODAuMjg0NCwxMjEuMzU4OCAxODEuNzI0NCwxMjEuMzU4OCAxODIuMjkyNCwxMTkuOTQyOCBMMTk4LjQxNzQsODAuMDEzOCBDMTk4Ljk3NTQsNzguNjI5OCAxOTcuMzYwNCw3OC42Mjk4IDE5Ny4zNjA0LDc4LjYyOTggTDE5Ny4zNjA0LDc4LjYyOTggWiBNMTMyLjkwMjQsMTA1LjkxNDggTDEyNC4yMDI0LDEwNS45MTQ4IEMxMjAuNzM5NCwxMDUuOTE0OCAxMTcuOTIyNCwxMDMuMTEwOCAxMTcuOTIyNCw5OS42NDM4IEMxMTcuOTIyNCw5Ni4xODI4IDEyMC43Mzk0LDkzLjM2MDggMTI0LjIwMjQsOTMuMzYwOCBMMTI2LjYzNTQsOTMuMzYwOCBDMTMwLjA4OTQsOTMuMzYwOCAxMzIuOTAyNCw5Ni4xODI4IDEzMi45MDI0LDk5LjY0MzggTDEzMi45MDI0LDEwNS45MTQ4IFoiIGlkPSJGaWxsLTEwIiBmaWxsPSIjRkVGRUZFIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
      />
    );
  }
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="navlogo_new"
      viewBox="0 0 841.9 595.3"
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html:
              ".cls-1 {\n" +
              "            fill: #c30000;\n" +
              "            fill-rule: evenodd;\n" +
              "            stroke-width: 0px;\n" +
              "          }",
          }}
        ></style>
      </defs>
      <path
        className="cls-1"
        d="M514.8,269.8h-19.9s-1.4,0-1.9,1.2l-11,33.8-11-33.8c-.5-1.2-1.9-1.2-1.9-1.2h-38.3c-.8,0-1.5.7-1.5,1.5v11.5c0-9.1-9.7-13-15.3-13-12.7,0-21.2,8.4-23.8,21.1-.1-8.4-.8-11.5-3.1-14.5-1-1.5-2.5-2.8-4.2-3.8-3.4-2-6.4-2.7-12.9-2.7h-7.7s-1.4,0-1.9,1.2l-7,17.3v-17c0-.8-.7-1.5-1.5-1.5h-17.7s-1.4,0-1.9,1.2l-7.2,18s-.7,1.8.9,1.8h6.8v34.2c0,.9.7,1.5,1.5,1.5h17.6c.8,0,1.5-.7,1.5-1.5v-34.2h6.9c3.9,0,4.8.1,6.3.8.9.4,1.8,1,2.2,1.9.9,1.7,1.2,3.8,1.2,10v21.5c0,.9.7,1.5,1.5,1.5h16.8s1.9,0,2.6-1.9l3.7-9.2c5,7,13.1,11.1,23.3,11.1h2.2s1.9,0,2.7-1.9l6.5-16.1v16.5c0,.9.7,1.5,1.5,1.5h17.2s1.9,0,2.7-1.9c0,0,6.9-17.1,6.9-17.2h0c.3-1.4-1.5-1.4-1.5-1.4h-6.1v-29.3l19.3,47.9c.8,1.9,2.6,1.9,2.6,1.9h20.3s1.9,0,2.7-1.9l21.4-53c.7-1.8-1.4-1.8-1.4-1.8h0ZM429.2,306h-11.5c-4.6,0-8.3-3.7-8.3-8.3s3.7-8.3,8.3-8.3h3.2c4.6,0,8.3,3.7,8.3,8.3v8.3h0Z"
      />
    </svg>
  );
}
