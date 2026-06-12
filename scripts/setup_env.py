#!/usr/bin/env python3
"""Project environment setup helper.

Creates a virtual environment in `.venv`, installs packages from
`requirements.txt` (if present), and runs `npm install` if `npm` is
available to install JS dependencies for this project.

Usage:
  python scripts/setup_env.py

This is cross-platform (Windows / POSIX).
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
import venv


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VENV_DIR = os.path.join(PROJECT_ROOT, ".venv")
REQUIREMENTS_FILE = os.path.join(PROJECT_ROOT, "requirements.txt")


def run(cmd: list[str], **kwargs) -> int:
    print("Running:", " ".join(cmd))
    return subprocess.run(cmd, check=False, **kwargs).returncode


def create_venv(path: str) -> None:
    if os.path.isdir(path):
        print(f"Virtual environment already exists at {path}")
        return
    print(f"Creating virtual environment at {path}...")
    builder = venv.EnvBuilder(with_pip=True)
    builder.create(path)
    print("Virtual environment created.")


def get_pip_executable(venv_path: str) -> str:
    if os.name == "nt":
        return os.path.join(venv_path, "Scripts", "pip.exe")
    return os.path.join(venv_path, "bin", "pip")


def install_requirements(pip_exe: str, req_file: str) -> None:
    if not os.path.isfile(req_file):
        print("No requirements.txt found; skipping Python package installation.")
        return
    print(f"Installing Python dependencies from {req_file}...")
    rc = run([pip_exe, "install", "-r", req_file])
    if rc != 0:
        print("Warning: pip install returned non-zero exit code.")


def run_npm_install(root: str) -> None:
    npm = shutil.which("npm")
    if not npm:
        print("npm not found in PATH; skipping npm install.")
        return
    # run npm install in project root
    print("Running npm install to fetch JS dependencies...")
    rc = subprocess.run([npm, "install"], cwd=root).returncode
    if rc != 0:
        print("Warning: npm install returned non-zero exit code.")


def main() -> int:
    print("Starting project setup...")
    create_venv(VENV_DIR)
    pip_exe = get_pip_executable(VENV_DIR)

    if not os.path.isfile(pip_exe):
        print("pip executable not found inside virtualenv; aborting.")
        return 2

    # Upgrade pip and setuptools first
    _ = run([pip_exe, "install", "--upgrade", "pip", "setuptools"]) 

    install_requirements(pip_exe, REQUIREMENTS_FILE)
    run_npm_install(PROJECT_ROOT)

    print("Setup complete.")
    if os.name == "nt":
        activate_cmd = f"{VENV_DIR}\\Scripts\\activate"
    else:
        activate_cmd = f"source {VENV_DIR}/bin/activate"

    print("Next steps:")
    print(f" - Activate the virtualenv: {activate_cmd}")
    print(" - Start the dev server with `npm run dev` or as your project requires.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
