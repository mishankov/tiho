package tests

var str = "string"

type My struct {
	i int
}

type Container struct {
	ms My
}

type Face interface{}

func F(param Face) error {
	return nil
}
