# Pipefitter's Rolling Offset & Fabrication Tool

A Python-based utility designed to bridge the gap between field pipefitting and digital precision. This tool calculates rolling offsets, true travel lengths, and actual pipe "cut lengths" by accounting for fitting take-outs and shop fractions.



## 🛠 Features

* **Rolling Offset Logic:** Calculates the True Offset and Travel length using 3D trigonometry.
* **Fabrication Ready:** Automatically subtracts fitting take-outs (90° LR and 45° elbows).
* **Shop-Friendly Output:** Converts decimal dimensions into standard 1/16" fractions (e.g., `10.625` -> `10 5/8"`).
* **Modular Design:** Separates core math logic from utility functions for easy expansion.

## 📐 How It Works

The tool uses the Pythagorean theorem to solve for the travel through a rolling offset:

$$True Offset = \sqrt{Rise^2 + Roll^2}$$
$$Travel = \sqrt{True Offset^2 + Run^2}$$

## 🚀 Getting Started

### Prerequisites
* Python 3.x

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/pipe-offset-calc.git](https://github.com/YOUR_USERNAME/pipe-offset-calc.git)
