import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef, useState } from "react";
// src/theme/theme.ts
var tokenNames = [
	"bg",
	"surface",
	"raised",
	"ink",
	"muted",
	"line",
	"accent",
	"accentInk",
	"selected",
	"selectedInk",
	"offTrack",
	"offKnob",
	"onTrack",
	"onKnob",
	"warn",
	"bad",
	"good",
	"shadow",
	"font",
	"fontDisplay",
	"fontMono",
	"fontMonoDisplay",
	"fontSize",
	"radius",
	"radiusSmall",
	"gapXs",
	"gapS",
	"gapM",
	"gapL",
	"controlHeight"
];
function defineTheme(theme) {
	return theme;
}
function cssVariableName(token) {
	return `--lv-${token.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}
function hasEveryToken(record) {
	return tokenNames.every((name) => record[name] !== void 0);
}
function mapTokens(value) {
	const record = Object.fromEntries(tokenNames.map((name) => [name, value(name)]));
	if (!hasEveryToken(record)) throw new Error("mapTokens missed a token");
	return record;
}
// src/theme/theme-css.ts
var unsafeInCss = /[;{}<>]/;
function declarations(tokens, scheme, indent) {
	const lines = tokenNames.map((name) => {
		const value = tokens[name];
		if (value.trim() === "" || unsafeInCss.test(value)) throw new Error(`Theme token "${name}" (${scheme}) has a value CSS can't hold: "${value}"`);
		return `${indent}${cssVariableName(name)}: ${value};`;
	});
	return [`${indent}color-scheme: ${scheme};`, ...lines].join("\n");
}
function themeCss(theme) {
	return [
		`:root,\n[data-theme="light"] {\n${declarations(theme.light, "light", "  ")}\n}`,
		`@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${declarations(theme.dark, "dark", "    ")}\n  }\n}`,
		`[data-theme="dark"] {\n${declarations(theme.dark, "dark", "  ")}\n}`
	].join("\n\n");
}
// src/theme/vars.ts
var varNames = mapTokens(cssVariableName);
var vars = mapTokens((token) => `var(${cssVariableName(token)})`);
var Button_module_default = {
	button: "lv-Button-button",
	primary: "lv-Button-primary",
	icon: "lv-Button-icon",
	inline: "lv-Button-inline"
};
// src/components/cx.ts
function cx(...names) {
	return names.filter(Boolean).join(" ");
}
// src/components/Button.tsx
var variantClass = {
	normal: void 0,
	primary: Button_module_default.primary,
	icon: Button_module_default.icon,
	inline: Button_module_default.inline
};
function Button({ variant = "normal", href, className, children, ...rest }) {
	const classes = cx(Button_module_default.button, variantClass[variant], className);
	if (href !== void 0) return /* @__PURE__ */ jsx("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		className: classes,
		"aria-label": rest["aria-label"],
		title: rest.title,
		children
	});
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: classes,
		...rest,
		children
	});
}
var Card_module_default = {
	card: "lv-Card-card",
	media: "lv-Card-media",
	body: "lv-Card-body",
	head: "lv-Card-head",
	footer: "lv-Card-footer",
	eyebrow: "lv-Card-eyebrow",
	heading: "lv-Card-heading",
	description: "lv-Card-description"
};
// src/components/has-content.ts
function hasContent(node) {
	return node !== void 0 && node !== null && node !== false && node !== "";
}
var text_module_default = { text: "lv-text-text" };
// src/components/Card.tsx
var headingTags = {
	1: "h1",
	2: "h2",
	3: "h3"
};
function Card({ media, eyebrow, heading, headingLevel = 2, description, actions, footer, className, children }) {
	const Heading = headingTags[headingLevel];
	const hasHead = hasContent(heading) || hasContent(eyebrow) || hasContent(description) || hasContent(actions);
	return /* @__PURE__ */ jsxs("section", {
		className: cx(text_module_default.text, Card_module_default.card, className),
		children: [
			hasContent(media) && /* @__PURE__ */ jsx("div", {
				className: Card_module_default.media,
				children: media
			}),
			/* @__PURE__ */ jsxs("div", {
				className: Card_module_default.body,
				children: [hasHead && /* @__PURE__ */ jsxs("div", {
					className: Card_module_default.head,
					children: [/* @__PURE__ */ jsxs("div", { children: [
						hasContent(eyebrow) && /* @__PURE__ */ jsx("p", {
							className: Card_module_default.eyebrow,
							children: eyebrow
						}),
						hasContent(heading) && /* @__PURE__ */ jsx(Heading, {
							className: Card_module_default.heading,
							children: heading
						}),
						hasContent(description) && /* @__PURE__ */ jsx("p", {
							className: Card_module_default.description,
							children: description
						})
					] }), actions]
				}), children]
			}),
			hasContent(footer) && /* @__PURE__ */ jsx("div", {
				className: Card_module_default.footer,
				children: footer
			})
		]
	});
}
var Code_module_default = { code: "lv-Code-code" };
// src/components/Code.tsx
function Code({ children }) {
	return /* @__PURE__ */ jsx("code", {
		className: Code_module_default.code,
		children
	});
}
var Columns_module_default = { columns: "lv-Columns-columns" };
// src/components/Columns.tsx
function Columns({ min = "260px", className, children }) {
	const style = { "--columns-min": min };
	return /* @__PURE__ */ jsx("div", {
		className: cx(text_module_default.text, Columns_module_default.columns, className),
		style,
		children
	});
}
var Details_module_default = {
	details: "lv-Details-details",
	summary: "lv-Details-summary"
};
// src/components/is-external-href.ts
var absoluteUrl = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
var webProtocols = /* @__PURE__ */ new Set(["http:", "https:"]);
function isExternalHref(href) {
	if (!absoluteUrl.test(href)) return false;
	const pageOrigin = typeof window === "undefined" ? void 0 : window.location.origin;
	const base = pageOrigin ?? "https://page.invalid";
	if (!URL.canParse(href, base)) return false;
	const url = new URL(href, base);
	return webProtocols.has(url.protocol) && url.origin !== pageOrigin;
}
// src/components/Link.tsx
var linkClassName = { link: "lv-Link-link" }.link ?? "";
function Link({ href, className, children, ...rest }) {
	const external = isExternalHref(href);
	return /* @__PURE__ */ jsx("a", {
		href,
		className: cx(linkClassName, className),
		...external ? {
			target: "_blank",
			rel: "noreferrer"
		} : {},
		...rest,
		children
	});
}
// src/components/Details.tsx
function Details({ summary, children }) {
	return /* @__PURE__ */ jsxs("details", {
		className: cx(text_module_default.text, Details_module_default.details),
		children: [/* @__PURE__ */ jsx("summary", {
			className: cx(linkClassName, Details_module_default.summary),
			children: summary
		}), children]
	});
}
var Field_module_default = {
	field: "lv-Field-field",
	label: "lv-Field-label",
	hint: "lv-Field-hint",
	error: "lv-Field-error"
};
// src/components/Field.tsx
function Field({ label, hint, error, className, children }) {
	const id = useId();
	const hintId = `${id}-hint`;
	const errorId = `${id}-error`;
	const hasHint = hasContent(hint);
	const hasError = hasContent(error);
	const describedBy = cx(hasHint && hintId, hasError && errorId) || void 0;
	return /* @__PURE__ */ jsxs("div", {
		className: cx(text_module_default.text, Field_module_default.field, className),
		children: [
			hasContent(label) && /* @__PURE__ */ jsx("label", {
				className: Field_module_default.label,
				htmlFor: id,
				children: label
			}),
			hasHint && /* @__PURE__ */ jsx("span", {
				id: hintId,
				className: Field_module_default.hint,
				children: hint
			}),
			typeof children === "function" ? children({
				id,
				describedBy
			}) : children,
			hasError && /* @__PURE__ */ jsx("span", {
				id: errorId,
				className: Field_module_default.error,
				role: "alert",
				children: error
			})
		]
	});
}
var FilePicker_module_default = {
	picker: "lv-FilePicker-picker",
	dragging: "lv-FilePicker-dragging",
	input: "lv-FilePicker-input",
	hint: "lv-FilePicker-hint",
	file: "lv-FilePicker-file"
};
// src/components/FilePicker.tsx
function formatFileSize(sizeBytes) {
	return `${(sizeBytes / 1024).toFixed(2)} KB`;
}
function FilePicker({ file, onChange, accept, buttonText = "Choose a file", hint }) {
	const inputRef = useRef(null);
	const [dragging, setDragging] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		role: "group",
		"aria-label": buttonText,
		className: cx(text_module_default.text, FilePicker_module_default.picker, dragging && FilePicker_module_default.dragging),
		onDragOver: (event) => {
			event.preventDefault();
			setDragging(true);
		},
		onDragLeave: () => {
			setDragging(false);
		},
		onDrop: (event) => {
			event.preventDefault();
			setDragging(false);
			const dropped = event.dataTransfer.files[0];
			if (dropped) onChange(dropped);
		},
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Button, {
				variant: "primary",
				onClick: () => inputRef.current?.click(),
				children: buttonText
			}), /* @__PURE__ */ jsx("input", {
				ref: inputRef,
				className: FilePicker_module_default.input,
				type: "file",
				accept,
				tabIndex: -1,
				"aria-hidden": true,
				onChange: (event) => {
					onChange(event.target.files?.[0]);
					event.target.value = "";
				}
			})] }),
			hasContent(hint) && /* @__PURE__ */ jsx("span", {
				className: FilePicker_module_default.hint,
				children: hint
			}),
			file && /* @__PURE__ */ jsxs("div", {
				className: FilePicker_module_default.file,
				children: [/* @__PURE__ */ jsxs("span", { children: [
					file.name,
					" ",
					/* @__PURE__ */ jsx("span", {
						className: FilePicker_module_default.hint,
						children: formatFileSize(file.size)
					})
				] }), /* @__PURE__ */ jsx(Button, {
					variant: "inline",
					"aria-label": `Remove ${file.name}`,
					onClick: () => {
						onChange(void 0);
					},
					children: "×"
				})]
			})
		]
	});
}
var KeyLabel_module_default = { key: "lv-KeyLabel-key" };
// src/components/KeyLabel.tsx
function KeyLabel({ children }) {
	return /* @__PURE__ */ jsx("div", {
		className: KeyLabel_module_default.key,
		children
	});
}
var Notice_module_default = {
	notice: "lv-Notice-notice",
	error: "lv-Notice-error"
};
// src/components/Notice.tsx
function Notice({ error = false, children }) {
	return /* @__PURE__ */ jsx("div", {
		className: cx(text_module_default.text, Notice_module_default.notice, error && Notice_module_default.error),
		role: error ? "alert" : "status",
		children
	});
}
var Popover_module_default = {
	wrap: "lv-Popover-wrap",
	button: "lv-Popover-button",
	panel: "lv-Popover-panel"
};
// src/components/Popover.tsx
var windowMarginPx = 16;
var maxWidthPx = 380;
var gapBelowPx = 6;
function placeBelow(anchor, windowWidthPx) {
	const widthPx = Math.min(maxWidthPx, windowWidthPx - 32);
	return {
		top: anchor.bottom + gapBelowPx,
		left: Math.max(windowMarginPx, Math.min(anchor.left, windowWidthPx - windowMarginPx - widthPx)),
		maxWidth: widthPx
	};
}
function Popover({ label, children }) {
	const [place, setPlace] = useState();
	const wrapRef = useRef(null);
	const id = useId();
	const open = place !== void 0;
	useEffect(() => {
		if (!open) return;
		const close = () => {
			setPlace(void 0);
		};
		const replace = () => {
			const rect = wrapRef.current?.getBoundingClientRect();
			if (rect) setPlace(placeBelow(rect, window.innerWidth));
		};
		const closeIfOutside = (event) => {
			if (!(event.target instanceof Node) || !wrapRef.current?.contains(event.target)) close();
		};
		const closeOnEscape = (event) => {
			if (event.key === "Escape") close();
		};
		window.addEventListener("resize", replace);
		window.addEventListener("scroll", replace, true);
		document.addEventListener("pointerdown", closeIfOutside);
		document.addEventListener("keydown", closeOnEscape);
		return () => {
			window.removeEventListener("resize", replace);
			window.removeEventListener("scroll", replace, true);
			document.removeEventListener("pointerdown", closeIfOutside);
			document.removeEventListener("keydown", closeOnEscape);
		};
	}, [open]);
	return /* @__PURE__ */ jsxs("span", {
		ref: wrapRef,
		className: cx(text_module_default.text, Popover_module_default.wrap),
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			className: cx(linkClassName, Popover_module_default.button),
			"aria-expanded": open,
			"aria-controls": open ? id : void 0,
			onClick: (event) => {
				setPlace(open ? void 0 : placeBelow(event.currentTarget.getBoundingClientRect(), window.innerWidth));
			},
			children: label
		}), open && /* @__PURE__ */ jsx("div", {
			id,
			role: "dialog",
			className: Popover_module_default.panel,
			style: place,
			children
		})]
	});
}
var Progress_module_default = {
	field: "lv-Progress-field",
	progress: "lv-Progress-progress"
};
// src/components/Progress.tsx
function Progress({ value, label }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cx(text_module_default.text, Progress_module_default.field),
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": true,
			children: label
		}), /* @__PURE__ */ jsx("progress", {
			className: Progress_module_default.progress,
			value,
			max: 1,
			"aria-label": label
		})]
	});
}
var input_module_default = {
	input: "lv-input-input",
	multiline: "lv-input-multiline"
};
// src/components/Select.tsx
function Select({ options, className, ...rest }) {
	return /* @__PURE__ */ jsx("select", {
		className: cx(input_module_default.input, className),
		...rest,
		children: options.map((option) => /* @__PURE__ */ jsx("option", {
			value: option.value,
			children: option.label
		}, option.value))
	});
}
var Spinner_module_default = {
	spinner: "lv-Spinner-spinner",
	spin: "lv-Spinner-spin"
};
// src/components/Spinner.tsx
function Spinner({ label = "Loading" }) {
	return /* @__PURE__ */ jsx("span", {
		className: Spinner_module_default.spinner,
		role: "status",
		"aria-label": label
	});
}
var Stack_module_default = {
	stack: "lv-Stack-stack",
	row: "lv-Stack-row",
	gapXs: "lv-Stack-gapXs",
	gapS: "lv-Stack-gapS",
	gapM: "lv-Stack-gapM",
	gapL: "lv-Stack-gapL"
};
// src/components/Stack.tsx
var gapClass = {
	xs: Stack_module_default.gapXs,
	s: Stack_module_default.gapS,
	m: Stack_module_default.gapM,
	l: Stack_module_default.gapL
};
function Stack({ gap = "m", row = false, className, style, children }) {
	return /* @__PURE__ */ jsx("div", {
		className: cx(text_module_default.text, row ? Stack_module_default.row : Stack_module_default.stack, gapClass[gap], className),
		style,
		children
	});
}
var Table_module_default = { table: "lv-Table-table" };
// src/components/Table.tsx
function Table({ items, rowKey, columns, caption, className }) {
	return /* @__PURE__ */ jsxs("table", {
		className: cx(text_module_default.text, Table_module_default.table, className),
		children: [
			hasContent(caption) && /* @__PURE__ */ jsx("caption", { children: caption }),
			/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("th", {
				scope: "col",
				children: column.header
			}, column.id)) }) }),
			/* @__PURE__ */ jsx("tbody", { children: items.map((item) => /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("td", { children: column.cell(item) }, column.id)) }, rowKey(item))) })
		]
	});
}
// src/components/TextArea.tsx
function TextArea({ className, ...rest }) {
	return /* @__PURE__ */ jsx("textarea", {
		className: cx(input_module_default.input, input_module_default.multiline, className),
		...rest
	});
}
// src/components/TextInput.tsx
function TextInput({ className, ...rest }) {
	return /* @__PURE__ */ jsx("input", {
		className: cx(input_module_default.input, className),
		...rest
	});
}
var Tip_module_default = { tip: "lv-Tip-tip" };
// src/components/Tip.tsx
function Tip({ tip, children }) {
	return /* @__PURE__ */ jsx("span", {
		className: Tip_module_default.tip,
		title: tip,
		children
	});
}
var Toggle_module_default = { toggle: "lv-Toggle-toggle" };
// src/components/Toggle.tsx
function Toggle({ checked, onChange, disabled = false, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: cx(text_module_default.text, Toggle_module_default.toggle),
		children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			role: "switch",
			checked,
			disabled,
			onChange: (event) => {
				onChange(event.target.checked);
			}
		}), /* @__PURE__ */ jsx("span", { children })]
	});
}
export { Button, Card, Code, Columns, Details, Field, FilePicker, KeyLabel, Link, Notice, Popover, Progress, Select, Spinner, Stack, Table, TextArea, TextInput, Tip, Toggle, cssVariableName, defineTheme, linkClassName, themeCss, tokenNames, varNames, vars };
