import glob

for f in sorted(glob.glob("src/*.*")) + ["index.html"]:
    with open(f, "r", encoding="utf-8", errors="replace") as fp:
        content = fp.read()
    mojibake = "縺" in content or "繝" in content or "\ufffd" in content
    print(f"{f:30} : {'[MOJIBAKE DETECTED!]' if mojibake else '[CLEAN OK]'}")
