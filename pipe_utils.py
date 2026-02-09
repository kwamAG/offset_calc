import math

def get_cut_length(travel, pipe_size, fitting_type="90_LR"):
    """
    Calculates the actual cut length of pipe by subtracting fitting take-outs.
    Default is Long Radius (LR) 90: Take-out = 1.5 * Pipe Size
    """
    if fitting_type == "90_LR":
        take_out = 1.5 * pipe_size
    elif fitting_type == "45":
        # Standard 45 take-out is approx 0.625 * pipe size for many schedules
        take_out = 0.625 * pipe_size
    else:
        take_out = 0
        
    # We subtract twice because there is usually a fitting on both ends
    return travel - (take_out * 2)

def decimal_to_fraction(decimal_inches):
    """
    Converts a decimal like 10.625 into a shop-friendly string like 10 5/8".
    Precision is set to 1/16th of an inch.
    """
    whole_inches = int(decimal_inches)
    remainder = decimal_inches - whole_inches
    
    # Calculate how many 16ths are in the remainder
    sixteenths = round(remainder * 16)
    
    if sixteenths == 0:
        return f"{whole_inches}\""
    if sixteenths == 16:
        return f"{whole_inches + 1}\""
    
    # Simplify the fraction (e.g., 8/16 becomes 1/2)
    gcd = math.gcd(sixteenths, 16)
    numerator = sixteenths // gcd
    denominator = 16 // gcd
    
    return f"{whole_inches} {numerator}/{denominator}\""
