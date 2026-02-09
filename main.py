import math
from pipe_utils import get_cut_length, decimal_to_fraction

def calculate_rolling_offset(rise, roll, run):
    # Calculate the "True Offset" using the Pythagorean theorem
    # True Offset = sqrt(rise^2 + roll^2)
    true_offset = math.sqrt(math.pow(rise, 2) + math.pow(roll, 2))

    # Calculate Travel (The actual length of pipe between fittings)
    # Travel = sqrt(true_offset^2 + run^2)
    travel = math.sqrt(math.pow(true_offset, 2) + math.pow(run, 2))

    # Calculate the fitting angle (usually 45, 90, etc.)
    # angle = arcsin(true_offset / travel)
    angle_rad = math.asin(true_offset / travel)
    angle_deg = math.degrees(angle_rad)

    return {
        "true_offset": round(true_offset, 4),
        "travel": round(travel, 4),
        "angle": round(angle_deg, 2)
    }

def main():
    print("--- Pipefitter's Rolling Offset Tool ---")
    try:
        rise = float(input("Enter Rise (inches): "))
        roll = float(input("Enter Roll (inches): "))
        run = float(input("Enter Run (inches): "))
        pipe_size = float(input("Enter Pipe Size (e.g., 4.0 for 4-inch pipe): "))

        results = calculate_rolling_offset(rise, roll, run)
        cut_len = get_cut_length(results['travel'], pipe_size=pipe_size)
        readable_cut = decimal_to_fraction(cut_len)

        print("
--- Results ---")
        print(f"True Offset: {results['true_offset']}"")
        print(f"Travel Length: {results['travel']}"")
        print(f"Required Fitting Angle: {results['angle']}°")
        print(f"Actual Cut Length: {readable_cut}")

    except ValueError:
        print("Please enter valid numbers.")

if __name__ == "__main__":
    main()
