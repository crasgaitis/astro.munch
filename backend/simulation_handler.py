def process_simulation_params(params):
    """
    Validate and process galaxy parameters.
    """
    try:
        if not isinstance(params, list):
            raise ValueError("Input must be a list of galaxy parameter dictionaries.")

        processed_params = []
        for galaxy in params:
            required_keys = ["name", "position", "velocity", "mass", "radius", "type"]
            for key in required_keys:
                if key not in galaxy:
                    raise ValueError(f"Missing required parameter: {key} in galaxy '{galaxy.get('name', '')}'")
            
            processed_params.append(galaxy)

        print("Received galaxy parameters:", processed_params)
        return {"num_galaxies": len(processed_params), "galaxies": processed_params}

    except Exception as e:
        raise ValueError(f"Invalid parameters: {str(e)}")
